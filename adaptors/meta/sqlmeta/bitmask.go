package sqlmeta

import (
	"database/sql/driver"
	"encoding/binary"
	"errors"
)

type Bitmask uint32

func (mask Bitmask) Value() (driver.Value, error) {
	if mask == 0 {
		return nil, errors.New("Not a valid bitmask")
	}

	var bs [4]byte
	binary.LittleEndian.PutUint32(bs[:], uint32(mask))

	return int64(mask), nil
}

func (mask *Bitmask) Scan(v interface{}) error {
	switch t := v.(type) {
	case int32:
		*mask = Bitmask(uint32(t))
	case uint32:
		*mask = Bitmask(t)
	case int64:
		*mask = Bitmask(t)
	case uint64:
		*mask = Bitmask(t)
	case []byte:
		*mask = Bitmask(binary.LittleEndian.Uint32(t))
	}

	return nil
}

/*const (
	OWNER_READ   Bitmask = 256
	OWNER_WRITE          = 128
	OWNER_DELETE         = 64
	GROUP_READ           = 32
	GROUP_WRITE          = 16
	GROUP_DELETE         = 8
	OTHER_READ           = 4
	OTHER_WRITE          = 2
	OTHER_DELETE         = 1
)*/

const (
	OTHER_DELETE Bitmask = 1 << iota
	OTHER_WRITE          // 4
	OTHER_READ
	GROUP_DELETE
	GROUP_WRITE
	GROUP_READ
	OWNER_DELETE
	OWNER_WRITE
	OWNER_READ
)

var DefaultPerms = OWNER_READ | OWNER_WRITE | OWNER_DELETE | GROUP_READ | OTHER_READ
