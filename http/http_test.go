package http

import "testing"

func TestHttp(t *testing.T) {

	server, err := New()
	if err != nil {
		t.Fatal(err)
	}
	server.Listen(":3000")

}
