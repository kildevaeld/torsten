package sqlmeta

import (
	"database/sql"
	"database/sql/driver"
	"encoding/json"
	"os"
	"time"

	"github.com/kildevaeld/torsten"
	"github.com/satori/go.uuid"
)

type NullTime struct {
	Time  time.Time
	Valid bool // Valid is true if Time is not NULL
}

// Scan implements the Scanner interface.
func (nt *NullTime) Scan(value interface{}) error {
	nt.Time, nt.Valid = value.(time.Time)
	return nil
}

// Value implements the driver Valuer interface.
func (nt NullTime) Value() (driver.Value, error) {
	if !nt.Valid {
		return nil, nil
	}
	return nt.Time, nil
}

type MetaMap map[string]interface{}

// Scan implements the Scanner interface.
func (nt *MetaMap) Scan(value interface{}) error {
	var err error
	switch t := value.(type) {
	case string:
		err = json.Unmarshal([]byte(t), nt)
	case []byte:
		err = json.Unmarshal(t, nt)
	}
	return err
}

// Value implements the driver Valuer interface.
func (nt MetaMap) Value() (driver.Value, error) {
	b, e := json.Marshal(nt)
	if e != nil {
		return nil, e
	}
	return string(b), nil
}

type Node struct {
	Id       int64         `db:"id"`
	IsDir    bool          `db:"is_dir"`
	Path     string        `db:"path"`
	ParentId sql.NullInt64 `db:"parent_id"`
	FileId   sql.NullInt64 `db:"file_id"`

	Cid   []byte         `db:"cid"`
	Name  sql.NullString `db:"name"`
	Size  sql.NullInt64  `db:"size"`
	Mode  sql.NullInt64  `db:"perms"`
	Ctime NullTime       `db:"ctime"`
	Mtime NullTime       `db:"mtime"`
	Gid   sql.NullInt64  `db:"gid"`
	Uid   sql.NullInt64  `db:"uid"`
	Mime  sql.NullString `db:"mime_type"`
	Meta  MetaMap        `db:"meta"`
	Sha1  []byte         `db:"sha1"`
}

func (self Node) ToFileNode() (*torsten.FileNode, error) {
	if self.IsDir {
		return &torsten.FileNode{
			IsDir: true,
			Path:  self.Path,
		}, nil
	}

	cid, err := uuid.FromBytes(self.Cid)
	if err != nil {
		return nil, err
	}

	return &torsten.FileNode{
		IsDir: false,
		Path:  self.Path,
		File: &torsten.FileInfo{
			Id:    cid,
			Name:  self.Name.String,
			Size:  self.Size.Int64,
			Mode:  os.FileMode(self.Mode.Int64),
			Ctime: self.Ctime.Time,
			Mtime: self.Mtime.Time,
			Gid:   int(self.Gid.Int64),
			Uid:   int(self.Uid.Int64),
			Mime:  self.Mime.String,
			Sha1:  self.Sha1,
			Meta:  self.Meta,
		},
	}, nil

}

type File struct {
	Cid   []byte      `db:"cid"`
	Name  string      `db:"name"`
	Size  int64       `db:"size"`
	Mode  os.FileMode `db:"perms"`
	Ctime time.Time   `db:"ctime"`
	Mtime time.Time   `db:"mtime"`
	Gid   int         `db:"gid"`
	Uid   int         `db:"uid"`
	Mime  string      `db:"mime_type"`
	Meta  MetaMap     `db:"meta"`
	Sha1  []byte      `db:"sha1"`
}

func (self File) ToInfo() (torsten.FileInfo, error) {
	id, err := uuid.FromBytes(self.Cid)
	if err != nil {
		return torsten.FileInfo{}, err
	}
	return torsten.FileInfo{
		Id:    id,
		Name:  self.Name,
		Size:  self.Size,
		Mode:  self.Mode,
		Gid:   self.Gid,
		Uid:   self.Uid,
		Mime:  self.Mime,
		Sha1:  self.Sha1,
		Ctime: self.Ctime,
		Mtime: self.Mtime,
		Meta:  self.Meta,
	}, nil
}
