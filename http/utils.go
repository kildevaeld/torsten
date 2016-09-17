package http

func IsTrue(path string) bool {
	return isTrueRegex.Match([]byte(path))
}
