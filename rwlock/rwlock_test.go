package rwlock

import (
	"fmt"
	"sync"
	"testing"
	"time"
)

func TestLock(t *testing.T) {

	lock := NewLock()
	lock.Start()
	var wg sync.WaitGroup

	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			var key []byte
			if i%2 == 0 {
				key = []byte("hello")
			} else {
				key = []byte("world")
			}
			fmt.Printf("Qcquiring readlock %d %s\n", i, key)
			lock.RLock(key)
			fmt.Printf("Having readlock %d %s\n", i, key)
			time.Sleep(time.Duration(i) * time.Duration(100) * time.Millisecond)
			fmt.Printf("Releasing readlock %d %s\n", i, key)
			lock.RUnlock(key)

		}(i)
	}
	time.Sleep(200 * time.Millisecond)

	for i := 0; i < 20; i++ {
		wg.Add(1)
		if i%2 == 0 {
			if i == 0 {
				time.Sleep(1 * time.Second)
			}
			go func(i int) {

				time.Sleep(time.Duration(i) * time.Duration(100) * time.Millisecond)

				defer wg.Done()
				var key []byte
				key = []byte("hello")
				fmt.Printf("Qcquiring READLOCK %d %s\n", i, key)
				lock.RLock(key)
				fmt.Printf("Having READLOCK %d %s\n", i, key)
				time.Sleep(time.Duration(i) * time.Duration(100) * time.Millisecond)
				fmt.Printf("Releasing READLOCK %d %s\n", i, key)
				lock.RUnlock(key)

			}(i)
		} else {
			go func(i int) {

				defer wg.Done()
				var key []byte
				key = []byte("hello")
				fmt.Printf("Qcquiring lock %d %s\n", i, key)
				lock.Lock(key)
				fmt.Printf("Having lock %d %s\n", i, key)
				time.Sleep(time.Duration(i) * time.Duration(100) * time.Millisecond)
				fmt.Printf("Releasing lock %d %s\n", i, key)
				lock.Unlock(key)

			}(i)
		}

	}

	wg.Wait()

}
