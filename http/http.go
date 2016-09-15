package http

import (
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	"github.com/Sirupsen/logrus"
	"github.com/kildevaeld/dict"
	_ "github.com/kildevaeld/filestore/filesystem"
	"github.com/kildevaeld/torsten"
	"github.com/labstack/echo"
	"github.com/labstack/echo/engine"
	"github.com/labstack/echo/engine/fasthttp"
	_ "github.com/mattn/go-sqlite3"
	uuid "github.com/satori/go.uuid"
)

var octetStream = "application/octet-stream"
var FileField = "file"
var isTrueRegex = regexp.MustCompile("true|yes|1|ja|oui|si")

type HttpServer struct {
	echo    *echo.Echo
	torsten torsten.Torsten
	log     *logrus.Logger
}

func notFoundOr(err error) error {
	if err == torsten.ErrNotFound {
		return torsten.ErrNotFound
	}
	return err
}

func (self *HttpServer) handleFile(ctx echo.Context, options torsten.GetOptions, stat *torsten.FileInfo, path string) error {

	reader, err := self.torsten.Open(path, options)
	if err != nil {
		return notFoundOr(err)
	}

	defer reader.Close()

	ctx.Response().Header().Add("Content-Type", stat.Mime)
	ctx.Response().Header().Add("Content-Length", fmt.Sprintf("%d", stat.Size))

	ctx.Response().WriteHeader(http.StatusOK)
	if _, err := io.Copy(ctx.Response(), reader); err != nil {
		return err
	}

	return nil
}

func (self *HttpServer) handleFiles(ctx echo.Context) error {
	path := "/" + ctx.ParamValues()[0]

	options := torsten.GetOptions{
		Gid: uuid.NewV4(),
		Uid: uuid.NewV4(),
	}

	if ctx.QueryParam("stat") != "" {
		stat, err := self.torsten.Stat(path, options)
		if err != nil {
			return ctx.JSON(http.StatusNotFound, dict.Map{
				"message": "Not Found",
			})
		}
		return ctx.JSON(http.StatusOK, stat)

	} else {

		stat, err := self.torsten.Stat(path, options)
		if err != nil {
			return err
		}
		if !stat.IsDir {
			return self.handleFile(ctx, options, stat, path)
		}

		var files []torsten.FileInfo
		err = self.torsten.List(path, torsten.ListOptions{}, func(path string, node *torsten.FileInfo) error {
			files = append(files, *node)
			return nil
		})

		/*if len(files) == 0 {
			return ctx.String(http.StatusNotFound, err.Error())
		}*/

		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, dict.Map{
				"message": err.Error(),
			})
		} else {
			if len(files) == 0 {
				files = []torsten.FileInfo{}
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
	o.Uid = uuid.NewV4()
	o.Gid = uuid.NewV4()

	return o
}

/*
 handles multiform and streams
 takes mime, and overwrite as query and forms parameters
 taks content-type and (if exists) content-length from file.Multipart header
 If the body is a stream, the content-type (mime) from the request header will be used

 It is parsed and overwritten in following order:
	form, query*/

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

		contentType := file.Header.Get("Content-Type")
		if contentType != "" && options.Mime == "" || options.Mime == octetStream {
			options.Mime = contentType
		}

		if size, err := strconv.Atoi(file.Header.Get("Content-Length")); err == nil {
			options.Size = int64(size)
		}

	} else {

	}

	defer reader.Close()

	// If the mime type is a generic,
	// let torsten take care of it
	if options.Mime == octetStream {
		options.Mime = ""
	}

	self.log.Debugf("create %s %#v", path, options)
	writer, err := self.torsten.Create(path, options)
	if err != nil {
		fmt.Printf("error what %s\n", err)
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

	/*_, err := self.torsten.Stat(path)
	if err != nil {
		return err
	}*/

	if err := self.torsten.RemoveAll(path, torsten.RemoveOptions{}); err != nil {
		return err
	}
	return nil
}

func (self *HttpServer) Listen(addr string) error {

	serr := fasthttp.New(addr)
	serr.MaxRequestBodySize = 100 * 1024 * 1024

	return self.listen(serr, addr)
}

func (self *HttpServer) listen(s engine.Server, addr string) error {
	self.echo.SetDebug(true)
	self.echo.Use(NewWithNameAndLogger("torsten", self.log))
	self.echo.Get("/*", self.handleFiles)
	self.echo.Post("/*", self.handleUpload)
	self.echo.Delete("/*", self.handleDeleteFile)

	self.log.Printf("Torsten#Http running an listening on: %s", addr)

	return self.echo.Run(s)
}

func (self *HttpServer) Close() error {
	return self.echo.Stop()
}

func New(t torsten.Torsten, l *logrus.Logger) (*HttpServer, error) {

	return &HttpServer{
		echo:    echo.New(),
		torsten: t, //torsten.New(data, meta),
		log:     l,
	}, nil
}
