package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"golang.org/x/net/websocket"

	re "github.com/dancannon/gorethink"
)

// PhotoData is a row in the db for an individual photo
type PhotoData struct {
	Photo  string `gorethink:"photo"`
	HashID string `gorethink:"hashID"`
}

func main() {
	session, err := re.Connect(re.ConnectOpts{
		Address:  "localhost:28015",
		Database: "together",
	})

	if err != nil {
		fmt.Println(err, "establishing db connection")
	}

	http.Handle("/sockets/groupConnect", websocket.Handler(groupConnect(session)))

	http.HandleFunc("/api/", handleAPI(session))

	http.Handle("/", http.FileServer(http.Dir("../public")))

	fmt.Println("Server running on port 4028")
	http.ListenAndServe(":4028", nil)
}

func groupConnect(s *re.Session) func(ws *websocket.Conn) {
	return func(ws *websocket.Conn) {
		var groupName string
		for {
			if err := websocket.Message.Receive(ws, &groupName); err != nil {
				fmt.Println("Can't receive")
			} else if groupName != "" {
				readInitialPics(ws, groupName, s)

				res, err := re.DB("together").Table(groupName).Changes().Run(s)
				if err != nil {
					fmt.Println(err, "in change feed connection")
				}
				var value interface{}

				for res.Next(&value) {
					websocket.JSON.Send(ws, value)
				}
			}
		}
	}
}

func handleAPI(s *re.Session) func(w http.ResponseWriter, req *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {
		path := req.URL.Path
		parts := strings.Split(path, "/")[1:]

		if parts[1] == "group" {
			if parts[2] == "create" {
				err := re.DB("together").TableCreate(parts[3]).Exec(s)

				if err != nil {
					w.WriteHeader(200)
					w.Write([]byte("Groupe exists"))
					req.Body.Close()
				} else {
					w.WriteHeader(201)
					w.Write([]byte("Group created"))
					req.Body.Close()
				}
			} else if parts[2] == "postPhoto" {
				decoder := json.NewDecoder(req.Body)
				var photo PhotoData

				err := decoder.Decode(&photo)
				if err != nil {
					fmt.Println(err, " decoding JSON")
				}

				_, err = re.DB("together").Table(parts[3]).Insert(photo).RunWrite(s)
				if err != nil {
					fmt.Println(err)
				}

				w.WriteHeader(201)
				w.Write([]byte("Photo saved"))
				req.Body.Close()
			}
		} else {
			w.WriteHeader(404)
			w.Write([]byte("You reached a dead end in the api!"))
			req.Body.Close()
		}
	}
}

func readInitialPics(ws *websocket.Conn, groupName string, s *re.Session) {
	cursor, err := re.DB("together").Table(groupName).Run(s)
	defer cursor.Close()
	if err != nil {
		fmt.Println(err, " in getting table values")
	}

	var response interface{}
	for cursor.Next(&response) {
		websocket.JSON.Send(ws, response)
	}
}
