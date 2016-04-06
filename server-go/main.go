package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"golang.org/x/net/websocket"

	re "github.com/dancannon/gorethink"
)

// PhotoData is a row in the db for an individual photo
type PhotoData struct {
	Photo string `gorethink:"photo"`
}

func main() {
	session, err := re.Connect(re.ConnectOpts{
		Address:  "localhost:28015",
		Database: "together",
	})

	if err != nil {
		log.Fatal(err)
	}

	http.Handle("/sockets/groupConnect", websocket.Handler(groupConnect(session)))

	http.HandleFunc("/api/", handleAPI(session))

	http.Handle("/", http.FileServer(http.Dir("../public")))

	fmt.Println("Server running on port 4028")
	http.ListenAndServe(":4028", nil)
}

func groupConnect(s *re.Session) func(ws *websocket.Conn) {
	return func(ws *websocket.Conn) {
		fmt.Println("inside socket handler")

		var err error
		// TODO grab a *Conn config struct for groupName off url
		//      setup chanes feed on group table
		for {
			type Photo struct {
				photo string
			}

			var data Photo

			if err = websocket.JSON.Receive(ws, &data); err != nil {
				log.Fatal(err)
				fmt.Println("Can't receive")
				break
			}

			fmt.Println("Received back from client")

			if err = websocket.JSON.Send(ws, data.photo); err != nil {
				fmt.Println("Can't send data")
				break
			}

		}
	}
}

func handleAPI(s *re.Session) func(w http.ResponseWriter, req *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {
		fmt.Println("In api")
		path := req.URL.Path
		parts := strings.Split(path, "/")[1:]

		if parts[1] == "group" {
			if parts[2] == "create" {
				err := re.DB("together").TableCreate(parts[3]).Exec(s)

				if err != nil {
					cursor, err := re.DB("together").Table(parts[3]).Run(s)
					defer cursor.Close()

					if err != nil {
						fmt.Println(err, " in getting table values")
					}

					var response []interface{}
					err = cursor.All(&response)

					if err != nil {
						fmt.Println(err, " getting data from cursor")
					}

					jsonData, err := json.Marshal(response)

					if err != nil {
						fmt.Println(err, " marshalling data")
					}

					w.WriteHeader(200)
					w.Header().Set("Content-Type", "application/json")
					w.Write(jsonData)
				} else {
					w.WriteHeader(201)
					w.Write([]byte("Table created or exists"))
				}
			} else if parts[2] == "postPhoto" {
				fmt.Println("In postPhoto")

				decoder := json.NewDecoder(req.Body)
				var photo PhotoData

				err := decoder.Decode(&photo)

				if err != nil {
					fmt.Println(err, " decoding JSON")
				}
				// TODO finish receiving images on a post
				_, err = re.DB("together").Table(parts[3]).Insert(photo).RunWrite(s)

				if err != nil {
					fmt.Println(err)
				}
			}
		} else {
			w.WriteHeader(404)
			w.Write([]byte("You reached a dead end in the api!"))
		}

	}
}
