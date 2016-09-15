package torsten

type Hook int

const (
	PreCreate Hook = iota + 1
	PostCreate
	PreRemove
	PostRemove
	PreList
	PostList
	PreGet
	PostGet
)
