package http

import (
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	"github.com/kildevaeld/dict"
	_ "github.com/kildevaeld/filestore/filesystem"
	"github.com/kildevaeld/torsten"
	"github.com/labstack/echo"
	"github.com/labstack/echo/engine/fasthttp"
	_ "github.com/mattn/go-sqlite3"
)

var FileField = "file"
var isTrueRegex = regexp.MustCompile("true|yes|1|ja|oui|si")

type HttpServer struct {
	echo    *echo.Echo
	torsten torsten.Torsten
}

func (self *HttpServer) handleFile(ctx echo.Context, stat torsten.FileInfo, path string) error {

	reader, err := self.torsten.Open(path)
	if err != nil {
		fmt.Printf("Error %v", err)
		return err
	}
	defer reader.Close()

	ctx.Response().Header().Add("Content-Type", stat.Mime)
	//ctx.Response().Header().Add("Content-Length", fmt.Sprintf("%d", stat.Size))

	if _, err := io.Copy(ctx.Response(), reader); err != nil {
		return err
	}

	fmt.Printf("HERE")

	return nil
}

func (self *HttpServer) handleFiles(ctx echo.Context) error {
	path := "/" + ctx.ParamValues()[0]

	if ctx.QueryParam("stat") != "" {
		stat, err := self.torsten.Stat(path)
		if err != nil {
			return ctx.JSON(http.StatusNotFound, dict.Map{
				"message": "Not Found",
			})
		}
		return ctx.JSON(http.StatusOK, stat)

	} else {

		stat, err := self.torsten.Stat(path)
		if err == nil {
			return self.handleFile(ctx, stat, path)
		}

		var files []torsten.FileNode
		err = self.torsten.List(path, func(node *torsten.FileNode) error {
			files = append(files, *node)
			return nil
		})

		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, dict.Map{
				"message": err.Error(),
			})
		} else {
			if len(files) == 0 {
				files = []torsten.FileNode{}
			}
			return ctx.JSON(http.StatusOK, files)
		}
	}

	return nil
}

func (self *HttpServer) getOptions(ctx echo.Context) (o torsten.CreateOptions) {
	o.Mime = ctx.QueryParam("mime")

	if size, err := strconv.Atoi(ctx.QueryParam("size")); err == nil {
		o.Size = int64(size)
	}

	if isTrueRegex.Match([]byte(ctx.QueryParam("overwrite"))) {
		o.Overwrite = true
	}

	if size, err := strconv.Atoi(ctx.FormValue("size")); err != nil {
		o.Size = int64(size)
	}
	if isTrueRegex.Match([]byte(ctx.FormValue("overwrite"))) {
		o.Overwrite = true
	}

	if mime := ctx.FormValue("mime"); mime != "" {
		o.Mime = mime
	}

	return o
}

func (self *HttpServer) handleUpload(ctx echo.Context) error {

	path := "/" + ctx.ParamValues()[0]
	contentType := ctx.Request().Header().Get("Content-Type")

	var reader io.ReadCloser
	options := self.getOptions(ctx)
	if strings.HasPrefix(contentType, "multipart/form-data") {
		file, err := ctx.FormFile(FileField)
		if err != nil {
			return err
		}
		if reader, err = file.Open(); err != nil {
			return err
		}
		if mime := file.Header.Get("Content-Type"); mime != "" {
			options.Mime = mime
		}

		if size, err := strconv.Atoi(file.Header.Get("Content-Length")); err == nil {
			options.Size = int64(size)
		}

	} else {

	}

	defer reader.Close()

	if options.Mime == "application/octet-stream" {
		options.Mime = ""
	}

	writer, err := self.torsten.Create(path, options)
	if err != nil {
		fmt.Printf("error %s\n", err)
		return err
	}

	if _, err := io.Copy(writer, reader); err != nil {
		writer.Close()
		return err
	}
	if err := writer.Close(); err != nil {
		return err
	}
	return ctx.JSON(http.StatusOK, dict.Map{
		"message": "ok",
	})
}

func (self *HttpServer) handleDeleteFile(ctx echo.Context) error {
	path := "/" + ctx.ParamValues()[0]

	_, err := self.torsten.Stat(path)
	if err != nil {
		return err
	}

	if err := self.torsten.Remove(path); err != nil {
		return err
	}
	return nil
}

func (self *HttpServer) Listen(addr string) error {
	self.echo.SetDebug(true)
	//self.echo.Use(middleware.Logger())

	self.echo.Get("/*", self.handleFiles)
	self.echo.Post("/*", self.handleUpload)
	self.echo.Delete("/*", self.handleDeleteFile)

	serr := fasthttp.New(addr)

	serr.MaxRequestBodySize = 100 * 1024 * 1024

	return self.echo.Run(serr)
}

func New(t torsten.Torsten) (*HttpServer, error) {
	/*var (
		meta torsten.MetaAdaptor
		data filestore.Store
		err  error
	)

	if meta, err = sqlmeta.New(sqlmeta.Options{
		Driver:  "sqlite3",
		Options: "database.sqlite",
		Debug:   true,
	}); err != nil {
		return nil, err
	}

	if data, err = filestore.New(filestore.Options{
		Driver:        "filesystem",
		DriverOptions: "./path",
	}); err != nil {
		return nil, err
	}*/

	return &HttpServer{
		echo:    echo.New(),
		torsten: t, //torsten.New(data, meta),
	}, nil
}
