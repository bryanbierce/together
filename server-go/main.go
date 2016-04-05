package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Server running on port 4028")
	http.ListenAndServe(":4028", http.FileServer(http.Dir("../public")))
}
