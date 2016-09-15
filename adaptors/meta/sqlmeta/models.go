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

/*type MetaMap map[string]interface{}

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
}*/

type FileNode struct {
	Id     InfoID          `db:"id"`
	Name   string          `db:"name"`
	Size   int64           `db:"size"`
	Mode   os.FileMode     `db:"perms"`
	Ctime  time.Time       `db:"ctime"`
	Mtime  time.Time       `db:"mtime"`
	Gid    InfoID          `db:"gid"`
	Uid    InfoID          `db:"uid"`
	Mime   string          `db:"mime_type"`
	Meta   torsten.MetaMap `db:"meta"`
	Sha1   []byte          `db:"sha1"`
	NodeId int64           `db:"node_id"`
	Hidden bool            `db:"hidden"`

	P_Id InfoID `db:"p_id"`
	//IsDir    bool          `db:"is_dir"`
	P_Path     string      `db:"p_path"`
	P_Ctime    NullTime    `db:"p_ctime"`
	P_Mtime    NullTime    `db:"p_mtime"`
	P_Gid      InfoID      `db:"p_gid"`
	P_Uid      InfoID      `db:"p_uid"`
	P_Perms    os.FileMode `db:"p_perms"`
	P_ParentId InfoID      `db:"p_parent_id"`
}

func (self FileNode) ToInfo(v *torsten.FileInfo) error {

	if self.Id.Id == uuid.Nil {
		// Dir
		*v = torsten.FileInfo{
			Id:   self.P_Id.Id,
			Name: filepath.Base(self.P_Path),
			//Size:   0,
			Mode: self.P_Perms,
			Gid:  self.P_Gid.Id,
			Uid:  self.P_Uid.Id,

			Ctime: self.P_Ctime.Time,
			Mtime: self.P_Mtime.Time,
			IsDir: true,
			//Path:  filepath.Dir(self.P_Path),
			//Hidden: self.Hidden,
		}
	} else {
		*v = torsten.FileInfo{
			Id:     self.Id.Id,
			Name:   self.Name,
			Size:   self.Size,
			Mode:   self.Mode,
			Gid:    self.Gid.Id,
			Uid:    self.Uid.Id,
			Mime:   self.Mime,
			Sha1:   self.Sha1,
			Ctime:  self.Ctime,
			Mtime:  self.Mtime,
			Meta:   self.Meta,
			Hidden: self.Hidden,
			//Path:   self.P_Path,
		}
	}
	return nil
}

type Node struct {
	Id InfoID `db:"id"`
	//IsDir    bool          `db:"is_dir"`
	Path     string      `db:"path"`
	Ctime    NullTime    `db:"ctime"`
	Mtime    NullTime    `db:"mtime"`
	Gid      InfoID      `db:"gid"`
	Uid      InfoID      `db:"uid"`
	Perms    os.FileMode `db:"perms"`
	ParentId InfoID      `db:"parent_id"`
	//ParentId sql.NullInt64 `db:"parent_id"`
	//FileId   sql.NullInt64 `db:"file_id"`

	/*Cid   []byte          `db:"cid"`
	Name  sql.NullString  `db:"name"`
	Size  sql.NullInt64   `db:"size"`
	Mode  sql.NullInt64   `db:"perms"`
	Ctime NullTime        `db:"ctime"`
	Mtime NullTime        `db:"mtime"`
	Gid   []byte          `db:"gid"`
	Uid   []byte          `db:"uid"`
	Mime  sql.NullString  `db:"mime_type"`
	Meta  torsten.MetaMap `db:"meta"`
	Sha1  []byte          `db:"sha1"`*/
}

func (self Node) ToInfo() (*torsten.FileInfo, error) {
	return &torsten.FileInfo{
		Id:   self.Id.Id,
		Name: filepath.Base(self.Path),
		//Path:  filepath.Dir(self.Path),
		Ctime: self.Ctime.Time,
		Mtime: self.Mtime.Time,
		Gid:   self.Gid.Id,
		Uid:   self.Uid.Id,
		Mode:  self.Perms,
		IsDir: true,
	}, nil
}

/*func (self Node) ToFileNode() (*torsten.FileNode, error) {
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

	if self.Meta == nil {
		self.Meta = torsten.MetaMap{}
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
			Gid:   self.G,
			Uid:   int(self.Uid.Int64),
			Mime:  self.Mime.String,
			Sha1:  self.Sha1,
			Meta:  self.Meta,
		},
	}, nil

}*

func (self Node) ToFileInfo() (*torsten.FileInfo, error) {
	if self.IsDir {
		return &torsten.FileInfo{
			IsDir: true,
			Name:  filepath.Base(self.Path),
		}, nil
	}

	cid, err := uuid.FromBytes(self.Cid)
	if err != nil {
		return nil, err
	}

	if self.Meta == nil {
		self.Meta = torsten.MetaMap{}
	}

	return &torsten.FileInfo{
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
		IsDir: false,
	}, nil

}*/

type File struct {
	Id     InfoID          `db:"id"`
	Name   string          `db:"name"`
	Size   int64           `db:"size"`
	Mode   os.FileMode     `db:"perms"`
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
	/*id, err := uuid.FromBytes(self.Cid)
	if err != nil {
		return torsten.FileInfo{}, err
	}*/

	if self.Meta == nil {
		self.Meta = torsten.MetaMap{}
	}

	return &torsten.FileInfo{
		Id:     self.Id.Id,
		Name:   self.Name,
		Size:   self.Size,
		Mode:   self.Mode,
		Gid:    self.Gid.Id,
		Uid:    self.Uid.Id,
		Mime:   self.Mime,
		Sha1:   self.Sha1,
		Ctime:  self.Ctime,
		Mtime:  self.Mtime,
		Meta:   self.Meta,
		Hidden: self.Hidden,
		//Path:   self.Path,
	}, nil
}
