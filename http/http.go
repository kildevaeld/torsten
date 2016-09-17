package http

import (
	"net/http"
	"regexp"

	"github.com/Sirupsen/logrus"
	"github.com/kildevaeld/dict"
	_ "github.com/kildevaeld/filestore/filesystem"
	"github.com/kildevaeld/torsten"
	"github.com/kildevaeld/torsten/thumbnail"
	"github.com/labstack/echo"
	"github.com/labstack/echo/engine"
	"github.com/labstack/echo/engine/fasthttp"
	"github.com/labstack/echo/middleware"
	_ "github.com/mattn/go-sqlite3"
)

var octetStream = "application/octet-stream"
var FileField = "file"
var isTrueRegex = regexp.MustCompile("true|yes|1|ja|oui|si")

type Options struct {
	MaxRequestBody int `max_request_body`
	Expires        int
}

type HttpServer struct {
	echo    *echo.Echo
	torsten torsten.Torsten
	log     *logrus.Logger
	thumb   *thumbnail.Thumbnail
	o       Options
}

func notFoundOr(ctx echo.Context, err error, json bool) error {

	status := http.StatusInternalServerError
	if err == torsten.ErrNotFound {
		status = http.StatusNotFound
	} else if err == torsten.ErrAlreadyExists {
		status = http.StatusConflict
	} else if err == nil {
		return nil
	}

	if json {
		return ctx.JSON(status, dict.Map{
			"message": err,
		})
	}
	return ctx.String(status, err.Error())
}

func (self *HttpServer) Listen(addr string) error {

	serr := fasthttp.New(addr)

	if self.o.MaxRequestBody > 0 {
		serr.MaxRequestBodySize = 100 * 1024 * 1024
	}

	return self.listen(serr, addr)
}

func (self *HttpServer) listen(s engine.Server, addr string) error {
	//self.echo.SetDebug(true)

	self.echo.Use(NewWithNameAndLogger("torsten", self.log.WithField("prefix", "http")))
	self.echo.Use(middleware.Recover())
	self.echo.Use(middleware.CORSWithConfig(middleware.CORSConfig{
	//AllowOrigins: []string{"https://labstack.com", "https://labstack.net"},
	//AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	/*self.echo.Use(middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey: []byte("secret"),
	}))*/

	self.echo.Get("/*", self.handleFiles)
	self.echo.Post("/*", self.handleUpload)
	self.echo.Delete("/*", self.handleDeleteFile)

	self.log.Printf("Torsten#Http running an listening on: %s", addr)

	return self.echo.Run(s)
}

func (self *HttpServer) Close() error {
	return self.echo.Stop()
}

func New(t torsten.Torsten, o Options) *HttpServer {
	return NewWithLogger(t, logrus.New(), o)
}

func NewWithLogger(t torsten.Torsten, l *logrus.Logger, o Options) *HttpServer {
	thumb := thumbnail.NewThumbnailer(t)

	return &HttpServer{
		echo:    echo.New(),
		torsten: t, //torsten.New(data, meta),
		log:     l,
		thumb:   thumb,
		o:       o,
	}
}
