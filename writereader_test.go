package torsten

import (
	"fmt"
	"sync"
	"testing"
	"time"
)

func TestWriteReader(t *testing.T) {

	var wg sync.WaitGroup

	buf := NewWriteReader()

	wg.Add(1)
	go func() {
		i := 10
		for i > 0 {
			//fmt.Printf("write: %d\n", i)
			buf.Write([]byte(fmt.Sprintf("from write: %d", i)))
			time.Sleep(40 * time.Millisecond)
			i--
		}
		wg.Done()
	}()

	go func() {

		for {
			b := make([]byte, 10)
			_, e := buf.Read(b)
			if e != nil {
				fmt.Printf("got EOF\n")

				return
			}
			/*if i == 0 {
				continue
			}*/
			//time.Sleep(70 * time.Millisecond)
			//fmt.Printf("size: %d read: '%s'\n", i, b)
			//buf.Write([]bye(fmt.Sprintf("from write: %d", i)))

		}

	}()

	wg.Wait()
	buf.Write([]byte("Hello, World!"))
	buf.Close()

}
