//go:generate go-bindata -nomemcopy -nometadata -nocompress -pkg sqlmeta -o schema.go schemas/
package sqlmeta

import (
	"database/sql"
	"errors"
	"fmt"
	"path/filepath"
	"strings"

	sq "github.com/Masterminds/squirrel"
	"github.com/Sirupsen/logrus"
	"github.com/jmoiron/sqlx"
	"github.com/kildevaeld/torsten"
	uuid "github.com/satori/go.uuid"
)

var (
	FileNodeTable = "file_node"
	FileTable     = "file_info"
)

type Options struct {
	Driver  string
	Options string
	Debug   bool
}

type sqlmeta struct {
	db  *sqlx.DB
	log logrus.FieldLogger
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
	self.log.Debugf("initialize %s database", self.db.DriverName())
	// The mysql driver does not support multiple statements
	split := strings.Split(string(MustAsset(asset)), ";\n")
	for _, st := range split {
		st = strings.TrimSpace(st)
		if st == "" {
			continue
		}
		self.db.MustExec(st)
	}

	if self.db.DriverName() == "mysql" {
		split = strings.Split(string(MustAsset("schemas/mysql_funtions.sql")), "|\n")
		for _, str := range split {
			fmt.Println(str)
			if strings.TrimSpace(str) == "" {
				continue
			}

			self.db.MustExec(str)
		}

	}

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

		parent InfoID
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
		Columns("name", "size", "mime_type", "uid", "gid", "sha1", "id", "meta", "node_id", "hidden").
		Values(info.Name, info.Size, info.Mime, NewInfoID(info.Uid), NewInfoID(info.Gid), info.Sha1, NewInfoID(info.Id),
			info.Meta, parent, info.Hidden).ToSql()

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

func (self *sqlmeta) getParentIn(path string, o torsten.CreateOptions, tx *sqlx.Tx) (InfoID, error) {
	dir := filepath.Dir(path)

	dir = normalizeDir(dir)

	self.log.Debugf("Finding %s", dir)
	sqli, args, err := sq.Select("id").From(FileNodeTable).Where(sq.Eq{"path": dir}).ToSql()
	if err != nil {
		return NewInfoID(uuid.Nil), err
	}

	var parent InfoID
	if err = self.db.Get(&parent, sqli, args...); err != nil {
		return NewInfoID(uuid.Nil), err
	}

	return parent, nil
}

func (self *sqlmeta) getOrCreateParentIn(path string, o torsten.CreateOptions, tx *sqlx.Tx) (InfoID, error) {
	var (
		nodeId InfoID
		err    error
		sqli   string
		args   []interface{}
	)
	log := self.log.WithField("path", path)

	log.Debugf("finding parent for: %s", path)
	if nodeId, err = self.getParentIn(path, o, tx); err != nil {
		if err != sql.ErrNoRows {
			return NewInfoID(uuid.Nil), err
		}

		dir := filepath.Dir(path)
		dir = normalizeDir(dir)

		nodeId = NewInfoID(uuid.NewV4())
		log.Debugf("creating parent for: %s: %s", dir, nodeId)

		hidden := strings.HasPrefix(dir, ".") || strings.HasPrefix(dir, "/.")

		values := []interface{}{dir, NewInfoID(o.Uid), NewInfoID(o.Gid), nodeId, hidden}
		builder := sq.Insert(FileNodeTable).Columns("path", "uid", "gid", "id", "hidden")

		if dir != "/" {
			parent, err := self.getOrCreateParentIn(dir[:len(dir)-1], o, tx)
			if err != nil {
				return NewInfoID(uuid.Nil), err
			}

			builder = builder.Columns("parent_id")
			values = append(values, parent)

		}

		sqli, args, err = builder.Values(values...).ToSql()

		if err != nil {
			return NewInfoID(uuid.Nil), err
		}

		_, rerr := tx.Exec(sqli, args...)
		if rerr != nil {
			return NewInfoID(uuid.Nil), rerr
		}

	}

	return nodeId, nil
}

func (self *sqlmeta) Update(path string, info *torsten.FileInfo) error {
	return nil
}

func (self *sqlmeta) GetById(id uuid.UUID, info *torsten.FileInfo) error {
	builder := sq.Select(FileTable+".*, fn.path").From(FileTable).
		LeftJoin(fmt.Sprintf("%s fn ON fn.id = %s.node_id", FileNodeTable, FileTable)).
		Where(FileTable+".id = ?", NewInfoID(id))

	sqli, args, err := builder.ToSql()
	if err != nil {
		panic(err)
	}
	var file File
	if err = self.db.Get(&file, sqli, args...); err != nil {
		return err
	}

	return file.ToInfoFile(info)

}

func (self *sqlmeta) Get(path string, o torsten.GetOptions) (*torsten.FileInfo, error) {

	builder := sq.Select(FileTable + ".*").From(FileTable).
		LeftJoin(fmt.Sprintf("%s fn ON fn.id = %s.node_id", FileNodeTable, FileTable))

	if self.db.DriverName() == "sqlite3" {
		builder = builder.Where(sq.Expr("fn.path||file_info.name = ?", path))
	} else {
		builder = builder.Where(sq.Expr("CONCAT(fn.path, file_info.name) = ?", path))
	}

	/*builder = builder.Where(sq.Or{
		sq.And{
			sq.Or{sq.Eq{FileTable + ".uid": o.Uid}, sq.Eq{"file_info.gid": o.Gid}},
			sq.Expr(fmt.Sprintf("(%s.perms & %d) <> 0", FileTable, OWNER_READ|GROUP_READ)),
		},
		sq.Expr(fmt.Sprintf("(%s.perms & %d) <> 0", FileTable, OTHER_READ)),
	})*/
	builder = self.buildReadPerms(FileTable, builder, o)

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
		builder = self.buildReadPerms(FileNodeTable, builder, o)

		if sqli, args, err = builder.ToSql(); err != nil {
			panic(err)
		}
		var node Node
		if err := self.db.Get(&node, sqli, args...); err != nil {
			return nil, notFoundOr(err)
		}

		return node.ToInfo()
	}
	file.Path = filepath.Dir(path)
	return file.ToInfo()
}

func (self *sqlmeta) buildReadPerms(table string, builder sq.SelectBuilder, o torsten.GetOptions) sq.SelectBuilder {
	var gids [][]byte

	for _, g := range o.Gid {
		gids = append(gids, g.Bytes())
		//gids = append(gids, NewInfoID(g))
	}
	return builder.Where(sq.Or{
		sq.And{
			sq.Or{sq.Eq{table + ".uid": o.Uid}, sq.Eq{table + ".gid": gids}},
			sq.Expr(fmt.Sprintf("(%s.perms & %d) <> 0", table, OWNER_READ|GROUP_READ)),
		},
		sq.Expr(fmt.Sprintf("(%s.perms & %d) <> 0", table, OTHER_READ)),
	})
}

func (self *sqlmeta) List(prefix string, options torsten.ListOptions, fn func(path string, node *torsten.FileInfo) error) error {

	builder := sq.Select(FileNodeTable + ".*").From(FileNodeTable).
		LeftJoin(fmt.Sprintf("%s pn ON pn.id = %s.parent_id", FileNodeTable, FileNodeTable))

	if options.Recursive {
		builder = builder.Where("pn.path LIKE ?", prefix+"%")
	} else {
		builder = builder.Where("pn.path = ?", normalizeDir(prefix))
	}

	if !options.Hidden {
		builder = builder.Where(FileNodeTable+".hidden = ?", false)
	}

	builder = self.buildReadPerms(FileNodeTable, builder, torsten.GetOptions{
		Uid: options.Uid,
		Gid: options.Gid,
	})

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

	builder = builder.Offset(uint64(options.Offset)).Limit(uint64(options.Limit))
	builder = self.buildReadPerms(FileTable, builder, torsten.GetOptions{
		Uid: options.Uid,
		Gid: options.Gid,
	})
	/*builder = builder.Where(sq.Or{
		sq.And{
			sq.Or{sq.Eq{FileTable + ".uid": options.Uid}, sq.Eq{"file_info.gid": options.Gid}},
			sq.Expr(fmt.Sprintf("(%s.perms & %d) <> 0", FileTable, OWNER_READ|GROUP_READ)),
		},
		sq.Expr(fmt.Sprintf("(%s.perms & %d) <> 0", FileTable, OTHER_READ)),
	})*/

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
			node.Path = prefix

			file, _ := node.ToInfo()
			if err = fn(node.Path, file); err != nil {
				return err
			}
		}
	}

	return nil

}

func (self *sqlmeta) Remove(path string, options torsten.RemoveOptions) error {

	var (
		err   error
		tx    *sqlx.Tx
		ids   []InfoID
		paths []InfoID
		sqli  string
		args  []interface{}
		stat  *torsten.FileInfo
	)

	if stat, err = self.Get(path, torsten.GetOptions{options.Gid, options.Uid}); err != nil {
		return err
	}

	if stat.IsDir {
		if tx, err = self.db.Beginx(); err != nil {
			return err
		}

		if ids, paths, err = self.removeNodesIn(path, options, tx); err != nil {
			tx.Rollback()
			return err
		}
		ids = append(ids, NewInfoID(stat.Id))
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
			"id": paths,
		}).ToSql(); err != nil {
			tx.Rollback()
			return err
		}

		if _, err := tx.Exec(sqli, args...); err != nil {
			tx.Rollback()
			return err
		}

		return tx.Commit()

	} else {

		sqli, args, err := sq.Delete(FileTable).Where("id = ?", NewInfoID(stat.Id)).ToSql()

		if err != nil {
			panic(err)
		}

		if _, err := self.db.Exec(sqli, args...); err != nil {
			return notFoundOr(err)
		}

	}

	return nil

}

func (self *sqlmeta) removeNodesIn(path string, o torsten.RemoveOptions, tx *sqlx.Tx) ([]InfoID, []InfoID, error) {
	table := FileNodeTable
	dir := normalizeDir(path)
	sqli, args, err := sq.Select(fmt.Sprintf("%s.id, %s.path", table, table)).From(table).
		Join(fmt.Sprintf("%s pn ON pn.id = %s.parent_id", table, table)).
		Where("pn.path = ?", dir).ToSql()
	if err != nil {
		panic(err)
	}

	var paths []InfoID
	var nodes []Node
	if err := tx.Select(&nodes, sqli, args...); err != nil {
		return nil, nil, err
	}

	var out []InfoID

	for _, n := range nodes {
		sout, spaths, err := self.removeNodesIn(n.Path, o, tx)
		if err != nil && err != sql.ErrNoRows {
			return nil, nil, err
		}
		if sout != nil {
			out = append(out, sout...)
		}
		paths = append(paths, spaths...)
		out = append(out, n.Id)

		if sqli, args, err = sq.Select("id").From(FileTable).Where("node_id = ?", n.Id).ToSql(); err != nil {
			return nil, nil, err
		}

		var pout []InfoID
		if err = tx.Select(&pout, sqli, args...); err != nil {

			continue
		}
		paths = append(paths, pout...)

	}
	return out, paths, nil
}

func (self *sqlmeta) Count(path string, options torsten.GetOptions) (int64, error) {

	builder := sq.Select("count(*)").From(FileTable).
		Join(fmt.Sprintf("%s fn ON fn.id = %s.node_id", FileNodeTable, FileTable)).
		Where(sq.Eq{"fn.path": normalizeDir(path)})

	builder = self.buildReadPerms(FileTable, builder, options)

	sqli, args, err := builder.ToSql()
	if err != nil {
		return -1, err
	}

	var count int64
	if err = self.db.Get(&count, sqli, args...); err != nil {
		return -1, err
	}

	return count, nil

}

func New(options Options) (torsten.MetaAdaptor, error) {

	return NewWithLogger(options, logrus.New())
}

func NewWithLogger(options Options, logger logrus.FieldLogger) (torsten.MetaAdaptor, error) {
	db, err := sqlx.Open(options.Driver, options.Options)

	if err != nil {
		return nil, err
	}

	m := &sqlmeta{db, logger}

	m.init()

	return m, nil
}
