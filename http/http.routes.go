package http

import (
	"fmt"
	"io"
	"io/ioutil"
	"math"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/kildevaeld/dict"
	"github.com/kildevaeld/torsten"
	"github.com/labstack/echo"
	uuid "github.com/satori/go.uuid"
)

func (self *HttpServer) handleFile(ctx echo.Context, options torsten.GetOptions, stat *torsten.FileInfo, path string) error {
	var (
		err    error
		reader io.ReadCloser
	)
	header := ctx.Response().Header()

	if IsTrue(ctx.QueryParam("thumbnail")) {
		stat, err = self.thumb.GetThumbnail(stat, options)
		if err != nil {
			return notFoundOr(ctx, err, false)
		}

	}

	if match := ctx.Request().Header().Get("If-None-Match"); match != "" {
		if strings.Contains(match, fmt.Sprintf("%x", stat.Sha1)) {
			ctx.Response().WriteHeader(http.StatusNotModified)
			return nil
		}
	}

	reader, err = self.torsten.Open(stat, options)
	if err != nil {
		return notFoundOr(ctx, err, false)
	}
	defer reader.Close()

	header.Set("Content-Type", stat.Mime)
	header.Set("Content-Length", fmt.Sprintf("%d", stat.Size))

	if IsTrue(ctx.QueryParam("download")) {
		header.Set("Content-Description", "File Transfer")
		header.Set("Content-Disposition", fmt.Sprintf(`attachment; filename="%s"`, stat.Name))
		header.Set("Connection", "Keep-Alive")
		header.Set("Expires", "0")
		header.Set("Cache-Control", "must-revalidate, post-check=0, pre-check=0")

	} else if self.o.Expires > 0 {
		header.Set("Etag", fmt.Sprintf(`"%x"`, stat.Sha1))
		header.Set("Cache-Control", fmt.Sprintf("max-age=%d", self.o.Expires))
	}

	ctx.Response().WriteHeader(http.StatusOK)

	if _, err = io.Copy(ctx.Response(), reader); err != nil {
		return err
	}

	return nil
}

func (self *HttpServer) handleFiles(ctx echo.Context) error {
	path := "/" + ctx.ParamValues()[0]

	options := torsten.GetOptions{
		Gid: []uuid.UUID{uuid.NewV4()},
		Uid: uuid.NewV4(),
	}

	if ctx.QueryParam("stat") != "" {
		stat, err := self.torsten.Stat(path, options)
		if err != nil {
			return ctx.JSON(http.StatusNotFound, dict.Map{
				"message": "Not Found",
			})
		}
		return ctx.JSON(http.StatusOK, dict.Map{
			"message": "ok",
			"data":    stat,
		})

	} else {
		var stat *torsten.FileInfo
		var err error

		if idStr := ctx.QueryParam("id"); idStr != "" {
			var id uuid.UUID
			id, err = uuid.FromString(idStr)
			if err != nil {
				return err
			}
			stat, err = self.torsten.Stat(id, options)

		} else {
			stat, err = self.torsten.Stat(path, options)
		}

		if err != nil {
			return notFoundOr(ctx, err, false)
		}

		if !stat.IsDir {
			return self.handleFile(ctx, options, stat, path)
		}

		var files []torsten.FileInfo
		o := self.getListOptions(ctx)
		err = self.torsten.List(path, o, func(path string, node *torsten.FileInfo) error {
			files = append(files, *node)
			return nil
		})

		if err != nil {
			return notFoundOr(ctx, err, true)
		} else {

			self.genLinks(ctx, o, path)

			if len(files) == 0 {
				files = []torsten.FileInfo{}
			}
			return ctx.JSON(http.StatusOK, dict.Map{
				"message": "ok",
				"data":    files,
			})
		}
	}

	return nil
}

func (self *HttpServer) genLinks(ctx echo.Context, o torsten.ListOptions, path string) error {

	count, err := self.torsten.Count(path)
	if err != nil {
		return err
	}

	pages := int64(math.Ceil(float64(count) / float64(o.Limit)))

	links := make(map[string]int)

	page := (o.Offset / o.Limit) + 1
	if page == 0 {
		page = 1
	}
	if page > 1 {
		links["prev"] = int(page - 1)
	}

	links["first"] = 1
	links["last"] = int(pages)
	if page < pages {
		links["next"] = int(page + 1)
	}

	uri := ctx.Request().URL()
	u := url.URL{
		Scheme:   ctx.Request().Scheme(),
		Path:     uri.Path(),
		Host:     ctx.Request().Host(),
		RawQuery: uri.QueryString(),
	}

	var out []string
	for k, v := range links {
		q := u.Query()
		q.Set("page", fmt.Sprintf("%d", v))
		u.RawQuery = q.Encode()
		out = append(out, fmt.Sprintf(`<%s>; rel="%s"`, u.String(), k))
	}

	ctx.Response().Header().Set("link", strings.Join(out, ", "))
	ctx.Response().Header().Set("X-Total-Count", fmt.Sprintf("%d", count))
	return nil
}

func (self *HttpServer) getCreateOptions(ctx echo.Context) (o torsten.CreateOptions) {
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

func (self HttpServer) getListOptions(ctx echo.Context) (o torsten.ListOptions) {

	//user := ctx.Get("user").(*jwt.Token)
	var (
		page  int
		limit int
		err   error
	)
	o.Uid = uuid.NewV4()
	o.Gid = []uuid.UUID{uuid.NewV4()}

	o.Limit = 50
	o.Offset = 0

	if isTrueRegex.Match([]byte(ctx.FormValue("show_hidden"))) {
		o.Hidden = true
	}

	if limit, err = strconv.Atoi("limit"); err == nil && limit > 0 {
		o.Limit = int64(limit)
	}

	if page, err = strconv.Atoi(ctx.QueryParam("page")); err == nil {
		if page == 0 {
			page = 1
		}
		o.Offset = int64(page-1) * o.Limit
	}

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
	options := self.getCreateOptions(ctx)

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
		contentType = ctx.Request().Header().Get(echo.HeaderContentType)
		if contentType != "" && options.Mime == "" || options.Mime == octetStream {
			options.Mime = contentType
		}

		contentSize := ctx.Request().Header().Get(echo.HeaderContentLength)
		if contentSize != "" {
			if size, err := strconv.Atoi(contentSize); err == nil {
				options.Size = int64(size)
			}
		}

		reader = ioutil.NopCloser(ctx.Request().Body())

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
		return notFoundOr(ctx, err, true)
	}

	if _, err := io.Copy(writer, reader); err != nil {
		writer.Close()
		return err
	}
	if err := writer.Close(); err != nil {
		return err
	}

	stat, serr := self.torsten.Stat(path, torsten.GetOptions{
		Uid: options.Uid,
		Gid: []uuid.UUID{options.Gid},
	})

	if serr != nil {
		panic(serr)
	}

	return ctx.JSON(http.StatusOK, dict.Map{
		"message": "ok",
		"data":    stat,
	})
}

func (self *HttpServer) handleDeleteFile(ctx echo.Context) error {
	path := "/" + ctx.ParamValues()[0]

	stat, err := self.torsten.Stat(path, torsten.GetOptions{})
	if err != nil {
		return err
	}

	if stat.IsDir {
		if err := self.torsten.RemoveAll(path, torsten.RemoveOptions{}); err != nil {
			return notFoundOr(ctx, err, true)
		}
	} else {

		if err := self.torsten.Remove(path, torsten.RemoveOptions{}); err != nil {
			return notFoundOr(ctx, err, true)
		}
	}

	return ctx.JSON(http.StatusOK, dict.Map{
		"message": "ok",
	})
}
