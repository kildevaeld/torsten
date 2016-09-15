//go:generate go-bindata -nomemcopy -nometadata -pkg sqlmeta -o schema.go schemas/
package sqlmeta

import (
	"database/sql"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"time"

	sq "github.com/Masterminds/squirrel"
	"github.com/Sirupsen/logrus"
	"github.com/jmoiron/sqlx"
	"github.com/kildevaeld/torsten"
	uuid "github.com/satori/go.uuid"
)

var (
	FileNodeTable = "file_node"
	FileTable     = "file_info"
	//FileStatusTable = "file_status"
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

func notFoundOr(err error) error {
	if err == sql.ErrNoRows {
		return torsten.ErrNotFound
	}
	return err
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

func (self *sqlmeta) Insert(path string, info *torsten.FileInfo) error {
	var (
		err error
		tx  *sqlx.Tx
	)

	if tx, err = self.db.Beginx(); err != nil {
		return err
	}

	if err = self.insertIn(path, info, tx); err != nil {
		tx.Rollback()
		return notFoundOr(err)
	}

	return tx.Commit()
}

func (self *sqlmeta) insertIn(path string, info *torsten.FileInfo, tx *sqlx.Tx) error {
	var (
		sqli string
		args []interface{}
		err  error

		parent uuid.UUID
	)

	log := self.log.WithField("path", path)

	log.Debugf("finalizing")

	if parent, err = self.getOrCreateParentIn(path, torsten.CreateOptions{
		Uid: info.Uid,
		Gid: info.Gid,
	}, tx); err != nil {
		log.Debugf("error %s", err)
		tx.Rollback()
		return err
	}

	sqli, args, err = sq.Insert(FileTable).
		Columns("name", "size", "mime_type", "uid", "gid", "sha1", "id", "meta", "node_id").
		Values(info.Name, info.Size, info.Mime, NewInfoID(info.Uid), NewInfoID(info.Gid), info.Sha1, NewInfoID(info.Id),
			info.Meta, NewInfoID(parent)).ToSql()

	if err != nil {
		tx.Rollback()
		panic(err)

	}

	log.Debugf("inserting %s - %v", sqli, args)
	if _, err = tx.Exec(sqli, args...); err != nil {
		return err
	}

	return nil
}

func normalizeDir(dir string) string {
	if dir == "" {
		return "/"
	} else if dir != "/" && dir[len(dir)-1] != '/' {
		dir += "/"
	}
	return dir
}

func (self *sqlmeta) getParentIn(path string, o torsten.CreateOptions, tx *sqlx.Tx) (uuid.UUID, error) {
	dir := filepath.Dir(path)

	dir = normalizeDir(dir)

	sqli, args, err := sq.Select("id").From(FileNodeTable).Where(sq.Eq{"path": dir}).ToSql()
	if err != nil {
		return uuid.Nil, err
	}

	var parent InfoID
	if err = self.db.Get(&parent, sqli, args...); err != nil {
		return uuid.Nil, err
	}

	return parent.Id, nil
}

func (self *sqlmeta) getOrCreateParentIn(path string, o torsten.CreateOptions, tx *sqlx.Tx) (uuid.UUID, error) {
	var (
		nodeId uuid.UUID
		err    error
		sqli   string
		args   []interface{}
	)
	log := self.log.WithField("path", path)

	log.Debugf("finding parent for: %s", path)
	if nodeId, err = self.getParentIn(path, o, tx); err != nil {
		if err != sql.ErrNoRows {
			return uuid.Nil, err
		}

		dir := filepath.Dir(path)
		dir = normalizeDir(dir)

		/*node = &Node{
			Path: dir,
		}*/
		nodeId = uuid.NewV4()
		log.Debugf("creating parent for: %s: %s", path, nodeId)

		values := []interface{}{dir, NewInfoID(o.Uid), NewInfoID(o.Gid), NewInfoID(nodeId)}
		builder := sq.Insert(FileNodeTable).Columns("path", "uid", "gid", "id")

		if dir != "/" {
			parent, err := self.getOrCreateParentIn(dir[:len(dir)-1], o, tx)
			if err != nil {
				return uuid.Nil, err
			}

			builder = builder.Columns("parent_id")
			values = append(values, NewInfoID(parent))
			//node.ParentId.Int64 = parent
		}

		sqli, args, err = builder.Values(values...).ToSql()

		if err != nil {
			return uuid.Nil, err
		}

		_, rerr := tx.Exec(sqli, args...)
		if rerr != nil {
			return uuid.Nil, rerr
		}

		/*node, err = result.LastInsertId()
		if err != nil {
			return uuid.Nil, err
		}*/

	}

	return nodeId, nil
}

func (self *sqlmeta) Update(path string, info *torsten.FileInfo) error {
	return nil
}

func (self *sqlmeta) Get(path string, o torsten.GetOptions) (*torsten.FileInfo, error) {

	builder := sq.Select(FileTable + ".*").From(FileTable).
		LeftJoin(fmt.Sprintf("%s fn ON fn.id = %s.node_id", FileNodeTable, FileTable))

	if self.db.DriverName() == "sqlite3" {
		builder = builder.Where(sq.Expr("fn.path||file_info.name = ?", path))
	} else {
		builder = builder.Where(sq.Expr("CONCAT(fn.path, file_info.name) = ?", path))
	}

	sqli, args, err := builder.ToSql()

	if err != nil {
		panic(err)
	}

	var (
		file File
	)

	if err := self.db.Get(&file, sqli, args...); err != nil {
		if err != sql.ErrNoRows {
			return nil, err
		}
		dir := normalizeDir(path)
		builder = sq.Select("*").From(FileNodeTable).Where(sq.Eq{"path": dir})
		if sqli, args, err = builder.ToSql(); err != nil {
			panic(err)
		}
		var node Node
		if err := self.db.Get(&node, sqli, args...); err != nil {
			return nil, notFoundOr(err)
		}

		return node.ToInfo()
	}

	return file.ToInfo()
}

func (self *sqlmeta) List(prefix string, options torsten.ListOptions, fn func(path string, node *torsten.FileInfo) error) error {

	builder := sq.Select(FileNodeTable + ".*").From(FileNodeTable).
		LeftJoin(fmt.Sprintf("%s pn ON pn.id = %s.parent_id", FileNodeTable, FileNodeTable))

	if options.Recursive {
		builder = builder.Where("pn.path LIKE ?", prefix+"%")
	} else {
		builder = builder.Where("pn.path = ?", prefix)
	}

	sqli, args, err := builder.ToSql()
	if err != nil {
		panic(err)
	}

	rows, rerr := self.db.Queryx(sqli, args...)
	if rerr == nil {
		var node Node
		for rows.Next() {
			if err := rows.StructScan(&node); err != nil {
				return notFoundOr(err)
			}

			file, _ := node.ToInfo()
			if err = fn(filepath.Dir(node.Path), file); err != nil {
				return err
			}
		}
	}

	builder = sq.Select(FileTable + ".*, fn.path").From(FileTable).
		LeftJoin(fmt.Sprintf("%s fn ON fn.id = %s.node_id", FileNodeTable, FileTable))

	if options.Recursive {
		builder = builder.Where("fn.path LIKE ?", prefix+"%")
	} else {
		if prefix != "/" && prefix[len(prefix)-1] != '/' {
			prefix += "/"
		}

		builder = builder.Where("fn.path = ?", prefix)
	}

	sqli, args, err = builder.ToSql()
	if err != nil {
		panic(err)
	}

	rows, rerr = self.db.Queryx(sqli, args...)
	if rerr == nil {
		var node File
		for rows.Next() {
			if err := rows.StructScan(&node); err != nil {
				return notFoundOr(err)
			}

			file, _ := node.ToInfo()
			if err = fn(node.Path, file); err != nil {
				return err
			}
		}
	}

	return nil
	/*var (
		fnt  = FileNodeTable
		sqli string
		args []interface{}
	)
	cols := []string{"f.*"}
	pcols := []string{"path", "ctime", "mtime", "id", "perms", "gid", "uid"}
	for _, p := range pcols {
		cols = append(cols, fmt.Sprintf("%s.%s as p_%s", fnt, p, p))
	}
	builder := sq.Select(cols...).From(fnt).
		Join(fmt.Sprintf("%s f ON f.node_id = %s.id", FileTable, fnt))

	if options.Recursive {
		builder = builder.Where(fnt+".path LIKE ?", prefix+"%")
	} else {
		builder = builder.Where(fnt+".path = ?", prefix)
	}

	sqli, args, err := builder.ToSql()

	if err != nil {
		panic(err)
	}
	fmt.Printf("%s - %v\n", sqli, args)
	var node FileNode
	var file torsten.FileInfo
	//var fileNode torsten.FileNode

	rows, rerr := self.db.Queryx(sqli, args...)
	if rerr != nil {
		return notFoundOr(rerr)
	}

	for rows.Next() {
		if err := rows.StructScan(&node); err != nil {
			return notFoundOr(err)
		}
		node.ToInfo(&file)
		fmt.Printf("%s %s\n", file.Name, file.Path)
		if err = fn(file.Path, &file); err != nil {
			return err
		}
	}

	return nil

	/*var (
		fnt  = FileNodeTable
		sqli string
		args []interface{}
	)
	cols := []string{fnt + ".path", fnt + ".is_dir", "f.*"}

	builder := sq.Select(cols...).From(fnt).
		LeftJoin(fmt.Sprintf("%s pn ON pn.id = %s.parent_id", fnt, fnt)).
		LeftJoin(fmt.Sprintf("%s f ON f.cid = %s.file_id", FileTable, FileNodeTable))

	if options.Recursive {
		builder = builder.Where("pn.path LIKE ?", prefix+"%")
	} else {
		builder = builder.Where("pn.path = ?", prefix)
	}

	sqli, args, err := builder.ToSql()

	if err != nil {
		return err
	}

	var node Node
	//var fileNode torsten.FileNode

	rows, rerr := self.db.Queryx(sqli, args...)
	if rerr != nil {
		return notFoundOr(rerr)
	}

	for rows.Next() {
		if err := rows.StructScan(&node); err != nil {
			return notFoundOr(err)
		}

	}

	return nil*/
}

func (self *sqlmeta) Remove(path string) error {
	return nil
	/*var (
		err   error
		tx    *sqlx.Tx
		ids   []int64
		paths [][]byte
		sqli  string
		args  []interface{}
		stat  *torsten.FileInfo
	)

	if stat, err = self.Get(path); err != nil {
		return err
	}

	if stat.IsDir {
		if tx, err = self.db.Beginx(); err != nil {
			return err
		}

		if ids, paths, err = self.removeNodesIn(path, tx); err != nil {
			tx.Rollback()
			return err
		}

		sqli, args, err = sq.Delete(FileNodeTable).Where(sq.Eq{
			"id": ids,
		}).ToSql()
		if err != nil {
			tx.Rollback()
			return err

		}

		if _, err := tx.Exec(sqli, args...); err != nil {
			tx.Rollback()
			return err
		}

		if sqli, args, err = sq.Delete(FileTable).Where(sq.Eq{
			"cid": paths,
		}).ToSql(); err != nil {
			tx.Rollback()
			return err
		}

		if _, err := tx.Exec(sqli, args...); err != nil {
			tx.Rollback()
			return err
		}

	} else {
		s, a, e := sq.Delete(FileTable).Where(sq.Eq{"cid": stat.Id}).ToSql()
		if e != nil {
			tx.Rollback()
			return e
		}

		if _, e = tx.Exec(s, a...); e != nil {
			tx.Rollback()
			return e
		}
	}

	return tx.Commit()*/

}

/*func (self *sqlmeta) removeNodesIn(path string, tx *sqlx.Tx) ([]int64, [][]byte, error) {
	table := FileNodeTable
	sqli, args, err := sq.Select(fmt.Sprintf("%s.id, %s.path, %s.is_dir, %s.file_id as cid", table, table, table, table)).From(table).
		Join(fmt.Sprintf("%s pn ON pn.id = %s.parent_id", table, table)).
		Where("pn.path = ?", path).ToSql()
	if err != nil {
		panic(err)
	}

	var paths [][]byte
	var nodes []Node
	if err := tx.Select(&nodes, sqli, args...); err != nil {
		return nil, nil, err
	}
	var out []int64
	for _, n := range nodes {
		if n.IsDir {
			sout, spaths, err := self.removeNodesIn(n.Path, tx)
			if err != nil && err != sql.ErrNoRows {
				return nil, nil, err
			}
			if sout != nil {
				out = append(out, sout...)
			}
			paths = append(paths, spaths...)

		} else {
			paths = append(paths, n.Cid)
		}
		out = append(out, n.Id)
	}
	return out, paths, nil
}*/

func (self *sqlmeta) Clean(before time.Time) (int64, error) {
	/*var (
		sqli string
		args []interface{}
		err  error
		ret  sql.Result
		i    int64
	)
	if sqli, args, err = sq.Delete(FileStatusTable).Where(sq.Lt{
		"ctime": before,
	}).ToSql(); err != nil {
		panic(err)
	}

	if ret, err = self.db.Exec(sqli, args...); err != nil {
		return 0, err
	}

	if i, err = ret.RowsAffected(); err != nil {
		return 0, err
	} else {
		return i, err
	}*/
	return 0, nil
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
