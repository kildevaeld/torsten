//go:generate go-bindata -nomemcopy -nometadata -pkg sqlmeta -o schema.go schemas/
package sqlmeta

import (
	"database/sql"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"

	sq "github.com/Masterminds/squirrel"
	"github.com/Sirupsen/logrus"
	"github.com/jmoiron/sqlx"
	"github.com/kildevaeld/torsten"
)

var (
	FileNodeTable   = "file_node"
	FileTable       = "file"
	FileStatusTable = "file_status"
)

type Options struct {
	Driver  string
	Options string
	Debug   bool
}

type sqlmeta struct {
	db  *sqlx.DB
	log *logrus.Logger
}

func (self *sqlmeta) init() error {
	var asset string
	switch self.db.DriverName() {
	case "sqlite3", "sqlite":
		asset = "schemas/sqlite.sql"
	case "mysql":
		asset = "schemas/mysql.sql"
	default:
		return errors.New("Driver not suppported: " + self.db.DriverName())
	}

	self.db.MustExec(string(MustAsset(asset)))

	return nil
}

func (self *sqlmeta) Finalize(path string, info *torsten.FileInfo) error {
	var (
		err error
		tx  *sqlx.Tx
	)

	if tx, err = self.db.Beginx(); err != nil {
		return err
	}

	if err = self.finalizeIn(path, info, tx); err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit()

}

func (self *sqlmeta) finalizeIn(path string, info *torsten.FileInfo, tx *sqlx.Tx) error {
	var (
		sqli string
		args []interface{}
		err  error

		parent *Node
	)

	log := self.log.WithField("path", path)

	log.Debugf("finalizing")

	if sqli, args, err = sq.Select("path").From(FileStatusTable).Where(sq.Eq{"path": path}).ToSql(); err != nil {
		return err
	}

	var oPath string
	if err = tx.Get(&oPath, sqli, args...); err != nil {
		return err
	}

	if sqli, args, err = sq.Delete(FileStatusTable).Where(sq.Eq{
		"path": path,
	}).ToSql(); err != nil {
		return err
	}
	log.Debugf("removing status %s", sqli)
	if _, err := tx.Exec(sqli, args...); err != nil {
		log.Errorf("removing status %s", err)
		return err
	}

	if parent, err = self.getOrCreateParentIn(path, tx); err != nil {
		log.Debugf("error %s", err)
		return err
	}

	sqli, args, err = sq.Insert(FileTable).
		Columns("name", "size", "mime_type", "uid", "gid", "sha1", "cid", "meta").
		Values(info.Name, info.Size, info.Mime, info.Uid, info.Gid, info.Sha1, info.Id.Bytes(), MetaMap(info.Meta)).ToSql()

	if err != nil {
		return err
	}

	log.Debugf("inserting %s", sqli)
	if _, err = tx.Exec(sqli, args...); err != nil {
		return err
	}

	sqli, args, err = sq.Insert(FileNodeTable).Columns("parent_id", "path", "is_dir", "file_id").
		Values(parent.Id, path, false, info.Id.Bytes()).ToSql()
	if err != nil {
		return err
	}

	if _, err = tx.Exec(sqli, args...); err != nil {
		return err
	}

	return nil
}

func (self *sqlmeta) getParentIn(path string, tx *sqlx.Tx) (*Node, error) {
	dir := filepath.Dir(path)

	sqli, args, err := sq.Select("*").From(FileNodeTable).Where(sq.Eq{"path": dir}).ToSql()
	if err != nil {
		return nil, err
	}

	var parent Node
	if err = self.db.Get(&parent, sqli, args...); err != nil {
		return nil, err
	}

	return &parent, nil
}

func (self *sqlmeta) getOrCreateParentIn(path string, tx *sqlx.Tx) (*Node, error) {
	var (
		node *Node
		err  error
		sqli string
		args []interface{}
	)
	log := self.log.WithField("path", path)

	log.Debugf("finding parent for: %s", path)
	if node, err = self.getParentIn(path, tx); err != nil {
		if err != sql.ErrNoRows {
			return nil, err
		}

		dir := filepath.Dir(path)

		if dir == "" {
			dir = "/"
		}

		node = &Node{
			Path:  dir,
			IsDir: true,
		}
		log.Debugf("creating parent for: %s", path)
		values := []interface{}{dir, true}
		builder := sq.Insert(FileNodeTable).Columns("path", "is_dir")

		if dir != "/" {
			parent, err := self.getOrCreateParentIn(dir, tx)
			if err != nil {
				return nil, err
			}
			builder = builder.Columns("parent_id")
			values = append(values, parent.Id)
			node.ParentId.Int64 = parent.Id
		}

		sqli, args, err = builder.Values(values...).ToSql()

		if err != nil {
			return nil, err
		}

		result, rerr := tx.Exec(sqli, args...)
		if rerr != nil {
			return nil, rerr
		}

		id, ierr := result.LastInsertId()
		if ierr != nil {
			return nil, ierr
		}

		node.Id = id

	}

	return node, nil
}

func (self *sqlmeta) Prepare(path string) error {
	var (
		tx  *sqlx.Tx
		err error
	)

	if tx, err = self.db.Beginx(); err != nil {
		return err
	}

	if err = self.prepareIn(path, tx); err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit()
}

func (self *sqlmeta) prepareIn(path string, tx *sqlx.Tx) error {
	var (
		sqli string
		args []interface{}
		err  error
	)
	logrus.WithField("path", path).Debugf("preparing")
	sqli, args, err = sq.Select("path").From(FileStatusTable).Where(sq.Eq{"path": path}).ToSql()
	if err != nil {
		return err
	}

	var oldPath string

	if err = tx.Get(&oldPath, sqli, args...); err != nil && err != sql.ErrNoRows {
		return err
	}

	if err == nil {
		return errors.New("path already exists")
	}

	if sqli, args, err = sq.Select("id").From(FileNodeTable).Where(sq.Eq{"path": path}).ToSql(); err != nil {
		return err
	}
	var id int64
	if err = tx.Get(&id, sqli, args...); err == nil || err != sql.ErrNoRows {
		if err == nil {
			return errors.New("path2 already exists")
		}
		return err
	}

	sqli, args, err = sq.Insert(FileStatusTable).Columns("path", "status").Values(path, "creating").ToSql()
	if err != nil {
		return err
	}

	_, e := tx.Exec(sqli, args...)
	return e
}

func (self *sqlmeta) Update(path string, info *torsten.FileInfo) error {
	return nil
}

func (self *sqlmeta) Get(path string) (torsten.FileInfo, error) {

	sqli, args, err := sq.Select(fmt.Sprintf("%s.*", FileTable)).From(FileTable).
		Join(fmt.Sprintf("%s fn ON fn.file_id = %s.cid", FileNodeTable, FileTable)).
		Where("fn.path = ? AND fn.is_dir = 0", path).ToSql()

	if err != nil {
		return torsten.FileInfo{}, err
	}

	var (
		file File
	)
	if err := self.db.Get(&file, sqli, args...); err != nil {
		return torsten.FileInfo{}, err
	}

	return file.ToInfo()
}

func (self *sqlmeta) List(prefix string, fn func(info *torsten.FileNode) error) error {
	var fnt = FileNodeTable

	cols := []string{fnt + ".path", fnt + ".is_dir", "f.*"}

	sqli, args, err := sq.Select(cols...).From(fnt).
		LeftJoin(fmt.Sprintf("%s pn ON pn.id = %s.parent_id", fnt, fnt)).
		LeftJoin(fmt.Sprintf("%s f ON f.cid = %s.file_id", FileTable, FileNodeTable)).
		Where("pn.path = ?", prefix).ToSql()

	if err != nil {
		return err
	}

	var node Node
	//var fileNode torsten.FileNode

	rows, rerr := self.db.Queryx(sqli, args...)
	if rerr != nil {
		return rerr
	}

	for rows.Next() {
		if err := rows.StructScan(&node); err != nil {
			return err
		}
		fileNode, err := node.ToFileNode()
		if err != nil {
			return err
		}
		if err := fn(fileNode); err != nil {
			return err
		}
	}

	return nil
}

func (self *sqlmeta) Remove(path string) error {
	var err error
	var tx *sqlx.Tx

	sqli, args, err := sq.Select("path").From(FileStatusTable).Where(sq.Eq{
		"path": path,
	}).ToSql()
	if err != nil {
		return err
	}

	if tx, err = self.db.Beginx(); err != nil {
		return err
	}
	self.log.WithField("path", path).Debugf("remove")
	var i string
	if e := tx.QueryRowx(sqli, args...).Scan(&i); e == nil {
		tx.Rollback()
		return errors.New("path is being created")
	}

	err = self.removeIn(path, tx)
	if err != nil {
		tx.Rollback()
		return err
	}
	return tx.Commit()
}

func (self *sqlmeta) removeIn(path string, tx *sqlx.Tx) error {
	var (
		err error
	)

	var fnt = FileNodeTable

	cols := []string{fnt + ".path", fnt + ".is_dir", "f.*"}

	sqli, args, err := sq.Select(cols...).From(fnt).
		LeftJoin(fmt.Sprintf("%s f ON f.cid = %s.file_id", FileTable, FileNodeTable)).
		Where(fmt.Sprintf("%s.path = ?", fnt), path).ToSql()

	if err != nil {
		return err
	}

	var node Node
	if err = tx.Get(&node, sqli, args...); err != nil {
		fmt.Printf("Could not find %s", path)
		return err
	}

	if node.IsDir {

		return self.List(node.Path, func(info *torsten.FileNode) error {
			fmt.Printf("DELETE %s\n", path)
			return self.removeIn(info.Path, tx)
		})
	} else {
		if sqli, args, err = sq.Delete(FileTable).Where("cid = ?", node.Cid).ToSql(); err != nil {
			return err
		}

		if _, err = tx.Exec(sqli, args...); err != nil {
			return err
		}
		if self.db.DriverName() == "sqlite3" {
			if sqli, args, err = sq.Delete(FileNodeTable).Where(sq.Eq{
				"path": path,
			}).ToSql(); err != nil {
				return err
			}

			if _, err := tx.Exec(sqli, args...); err != nil {
				return err
			}
		}

	}

	return nil
}

func New(options Options) (torsten.MetaAdaptor, error) {

	db, err := sqlx.Open(options.Driver, options.Options)

	if err != nil {
		return nil, err
	}

	m := &sqlmeta{db, logrus.New()}

	if options.Debug {
		m.log.Out = os.Stdout
		m.log.Level = logrus.DebugLevel
	} else {
		m.log.Out = ioutil.Discard

	}

	m.init()

	return m, nil
}
