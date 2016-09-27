package http

import (
	"errors"
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

type id_pair struct {
	uid uuid.UUID
	gid []uuid.UUID
}

func (self *HttpServer) idsFromJWT(ctx echo.Context) (*id_pair, error) {
	var (
		uid uuid.UUID
		gid uuid.UUID
		err error
		g   []interface{}
		ok  bool
		u   string
		s   string
	)
	user := ctx.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	if u, ok = claims["uid"].(string); !ok {
		return nil, errors.New("Invalid UID")
	}
	if g, ok = claims["gid"].([]interface{}); !ok {

		return nil, errors.New("Invalid GID")
	}

	if uid, err = uuid.FromString(u); err != nil {
		return nil, err
	}

	var gids []uuid.UUID
	for _, gwb := range g {
		if s, ok = gwb.(string); !ok {
			return nil, errors.New("Invalid")
		}
		if gid, err = uuid.FromString(s); err != nil {
			return nil, err
		}
		gids = append(gids, gid)
	}

	pair := &id_pair{uid, gids}

	return pair, nil
}

func (self *HttpServer) Listen(addr string) error {

	serr := fasthttp.New(addr)

	if self.o.MaxRequestBody > 0 {
		serr.MaxRequestBodySize = 100 * 1024 * 1024
	}

	return self.listen(serr, addr)
}

func (self *HttpServer) listen(s engine.Server, addr string) error {

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

	if self.o.JWTKey != nil && len(self.o.JWTKey) > 0 {
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

	thumb := thumbnail.NewThumbnailer(t, store)

	return &HttpServer{
		echo:    echo.New(),
		torsten: t,
		log:     l,
		thumb:   thumb,
		o:       o,
	}
}
