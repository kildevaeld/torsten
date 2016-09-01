//go:generate go-bindata -nomemcopy -nometadata -pkg sqlmeta -o schema.go schemas/
package sqlmeta

import (
	"github.com/jmoiron/sqlx"
	"github.com/kildevaeld/torsten"
)

type SqlMetaOptions struct {
	Driver  string
	Options string
}

type sqlmeta struct {
	db *sqlx.DB
}

func (self *sqlmeta) init() error {

	bs := MustAsset("schemas/sqlite.sql")

	self.db.MustExec(string(bs))

	return nil
}

func (self *sqlmeta) UpdateStatus(path string, status FileStatus) error {
	return nil
}

func (self *sqlmeta) Set(path string, info *FileInfo, status FileStatus) error {

	sqli := "INSERT INTO `file` (cid, name, mime_type, size, uid, gid, perms, status) VALUES "
	switch self.db.DriverName() {
	case "sqlite", "mysql":
		sqli += "(?,?,?,?,?,?,?,?);"
	case "pg":
		sqli += "($1,$2,$3,$4,$5,$6,$7,$8)"
	default:
		panic("driver not supported!")
	}

	self.db.Exec(sqli)

	return nil
}

func (self *sqlmeta) Get(id string) (*FileInfo, error) {
	return nil, nil
}

func (self *sqlmeta) List(path string, fn func(info *FileInfo) error) error {
	return nil
}

func (self *sqlmeta) Remove(path string) error {

}

func New(options SqlMetaOptions) (torsten.MetaAdaptor, error) {

	db, err := sqlx.Open(options.Driver, options.Options)

	if err != nil {
		return nil, err
	}

	m := &sqlmeta{db}

	m.init()

	return m, nil
}
