package http

import (
	"errors"
	"fmt"
	"net/http"
	"regexp"

	"github.com/Sirupsen/logrus"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/kildevaeld/dict"
	"github.com/kildevaeld/filestore"
	"github.com/kildevaeld/filestore/filesystem"
	uuid "github.com/satori/go.uuid"

	"github.com/kildevaeld/torsten"
	"github.com/kildevaeld/torsten/thumbnail"
	"github.com/labstack/echo"
	"github.com/labstack/echo/engine"
	"github.com/labstack/echo/engine/fasthttp"
	"github.com/labstack/echo/middleware"
)

var octetStream = "application/octet-stream"
var FileField = "file"
var isTrueRegex = regexp.MustCompile("true|yes|1|ja|oui|si")

type Options struct {
	MaxRequestBody int `max_request_body`
	Expires        int
	Log            bool
	JWTKey         []byte
}

type HttpServer struct {
	echo    *echo.Echo
	torsten torsten.Torsten
	log     logrus.FieldLogger
	thumb   *thumbnail.Thumbnail
	o       Options
}

func notFoundOr(ctx echo.Context, err error, json bool) error {

	status := http.StatusInternalServerError
	if err == torsten.ErrNotFound {
		status = http.StatusNotFound
	} else if err == torsten.ErrAlreadyExists {
		status = http.StatusConflict
	} else if err == filestore.ErrNotFound {
		status = http.StatusNotFound
	} else if err == nil {
		status = http.StatusOK
		err = errors.New("ok")
	}

	if json {
		return ctx.JSON(status, dict.Map{
			"message": err.Error(),
		})
	}
	return ctx.String(status, err.Error())
}

func (self *HttpServer) idsFromJWT(ctx echo.Context) (uid uuid.UUID, gid uuid.UUID) {

	user := ctx.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	u := claims["uid"].(string)
	g := claims["gid"].(string)

	var err error
	if uid, err = uuid.FromString(u); err != nil {
		return uuid.Nil, uuid.Nil
	}

	if gid, err = uuid.FromString(g); err != nil {
		return uuid.Nil, uuid.Nil
	}

	return
}

func (self *HttpServer) Listen(addr string) error {

	serr := fasthttp.New(addr)

	if self.o.MaxRequestBody > 0 {
		serr.MaxRequestBodySize = 100 * 1024 * 1024
	}

	return self.listen(serr, addr)
}

func (self *HttpServer) listen(s engine.Server, addr string) error {
	self.echo.SetDebug(true)
	self.thumb.Start()
	if self.o.Log {
		self.echo.Use(NewWithNameAndLogger("torsten", self.log.WithField("prefix", "http")))
	}
	self.echo.Use(middleware.Recover())
	self.echo.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		//AllowOrigins: []string{"https://labstack.com", "https://labstack.net"},
		AllowHeaders:  []string{echo.HeaderOrigin, echo.HeaderContentType, "Link", "Accept", echo.HeaderAuthorization, "User-Agent", "X-Requested-With"},
		ExposeHeaders: []string{"Link", "X-Total-Count", "Content-Length", echo.HeaderAuthorization, "Server"},
	}))

	self.echo.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Response().Header().Set("Server", "torsten 0.1")
			return next(c)
		}
	})

	if self.o.JWTKey != nil {
		self.echo.Use(middleware.JWTWithConfig(middleware.JWTConfig{
			SigningKey:  self.o.JWTKey,
			TokenLookup: "header:Authorization",
		}))
	}
	/*self.echo.Use(middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey: []byte("secret"),
	}))*/

	self.echo.Get("/*", self.handleFiles)
	self.echo.Post("/*", self.handleUpload)
	self.echo.Delete("/*", self.handleDeleteFile)

	self.log.Printf("Running and listening on: %s", addr)

	return self.echo.Run(s)
}

func (self *HttpServer) Close() error {
	self.thumb.Stop()
	return self.echo.Stop()
}

func New(t torsten.Torsten, o Options) *HttpServer {
	return NewWithLogger(t, logrus.New(), o)
}

func NewWithLogger(t torsten.Torsten, l logrus.FieldLogger, o Options) *HttpServer {

	store, _ := filesystem.New(filesystem.Options{
		Path: "./cache_path",
	})

	//store := memory.New()

	thumb := thumbnail.NewThumbnailer(t, store)

	s, _ := generateToken(o.JWTKey)
	fmt.Printf("\n%s\n", s)

	return &HttpServer{
		echo:    echo.New(),
		torsten: t, //torsten.New(data, meta),
		log:     l,
		thumb:   thumb,
		o:       o,
	}
}
