package http

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/satori/go.uuid"
)

func IsTrue(path string) bool {
	return isTrueRegex.Match([]byte(path))
}

func generateToken(secret []byte) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)

	claims["uid"] = uuid.NewV4().String()
	claims["gid"] = uuid.NewV4().String()

	return token.SignedString(secret)

}
