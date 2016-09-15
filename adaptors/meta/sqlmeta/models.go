package sqlmeta

import (
	"database/sql/driver"
	"os"
	"path/filepath"
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

type InfoID struct {
	Id    uuid.UUID
	Valid bool
}

// Scan implements the Scanner interface.
func (nt *InfoID) Scan(value interface{}) error {
	var err error

	switch t := value.(type) {
	case []byte:

		nt.Id, err = uuid.FromBytes(t)
	case string:
		nt.Id, err = uuid.FromString(t)
	}
	if err != nil {
		nt.Valid = false
		return err
	}
	nt.Valid = true
	return nil
}

// Value implements the driver Valuer interface.
func (nt InfoID) Value() (driver.Value, error) {
	if !nt.Valid {
		return nil, nil
	}

	if nt.Id == uuid.Nil {
		return nil, nil
	}
	b, e := nt.Id.MarshalBinary()

	return b, e
}

func NewInfoID(u uuid.UUID) InfoID {
	return InfoID{
		Id:    u,
		Valid: true,
	}
}

type Node struct {
	Id       InfoID   `db:"id"`
	Path     string   `db:"path"`
	Ctime    NullTime `db:"ctime"`
	Mtime    NullTime `db:"mtime"`
	Gid      InfoID   `db:"gid"`
	Uid      InfoID   `db:"uid"`
	Mode     Bitmask  `db:"perms"`
	ParentId InfoID   `db:"parent_id"`
	Hidden   bool     `db:"hidden"`
}

func (self Node) ToInfo() (*torsten.FileInfo, error) {
	return &torsten.FileInfo{
		Id:   self.Id.Id,
		Name: filepath.Base(self.Path),

		Ctime: self.Ctime.Time,
		Mtime: self.Mtime.Time,
		Gid:   self.Gid.Id,
		Uid:   self.Uid.Id,
		Mode:  os.FileMode(self.Mode),
		IsDir: true,
		Path:  filepath.Dir(self.Path),
	}, nil
}

type File struct {
	Id     InfoID          `db:"id"`
	Name   string          `db:"name"`
	Size   int64           `db:"size"`
	Mode   Bitmask         `db:"perms"`
	Ctime  time.Time       `db:"ctime"`
	Mtime  time.Time       `db:"mtime"`
	Gid    InfoID          `db:"gid"`
	Uid    InfoID          `db:"uid"`
	Mime   string          `db:"mime_type"`
	Meta   torsten.MetaMap `db:"meta"`
	Sha1   []byte          `db:"sha1"`
	NodeId InfoID          `db:"node_id"`
	Hidden bool            `db:"hidden"`
	Path   string          `db:"path"`
}

func (self File) ToInfo() (*torsten.FileInfo, error) {

	if self.Meta == nil {
		self.Meta = torsten.MetaMap{}
	}

	return &torsten.FileInfo{
		Id:     self.Id.Id,
		Name:   self.Name,
		Size:   self.Size,
		Mode:   os.FileMode(self.Mode),
		Gid:    self.Gid.Id,
		Uid:    self.Uid.Id,
		Mime:   self.Mime,
		Sha1:   self.Sha1,
		Ctime:  self.Ctime,
		Mtime:  self.Mtime,
		Meta:   self.Meta,
		Hidden: self.Hidden,
		Path:   self.Path,
	}, nil
}

func (self File) ToInfoFile(v *torsten.FileInfo) error {
	if self.Meta == nil {
		self.Meta = torsten.MetaMap{}
	}

	*v = torsten.FileInfo{
		Id:     self.Id.Id,
		Name:   self.Name,
		Size:   self.Size,
		Mode:   os.FileMode(self.Mode),
		Gid:    self.Gid.Id,
		Uid:    self.Uid.Id,
		Mime:   self.Mime,
		Sha1:   self.Sha1,
		Ctime:  self.Ctime,
		Mtime:  self.Mtime,
		Meta:   self.Meta,
		Hidden: self.Hidden,
		Path:   self.Path,
	}

	return nil
}
