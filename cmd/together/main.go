package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
	"time"

	"golang.org/x/net/websocket"

	re "github.com/dancannon/gorethink"
)

// PhotoData is a row in the db for an individual photo
type PhotoData struct {
	Photo    string `gorethink:"photo"`
	UserHash string `gorethink:"userHash"`
}

// GroupInfo stores the groupName & password for each open group
type GroupInfo struct {
	GroupName string `gorethink:"groupName"`
	Password  string `gorethink:"password"`
}

func main() {
	port := os.Getenv("PORT")

	session, err := re.Connect(re.ConnectOpts{
		Address:  "198.199.95.234:28015",
		Database: "together",
	})

	if err != nil {
		fmt.Println(err, "establishing db connection")
	}

	server := websocket.Server{
		Handshake: func(config *websocket.Config, req *http.Request) error {
			return nil
		},
		Handler: websocket.Handler(groupConnect(session)),
	}

	mux := http.NewServeMux()
	mux.Handle("/sockets/groupConnect", websocket.Handler(server.Handler))
	mux.HandleFunc("/api/", handleAPI(session))
	mux.HandleFunc("/", handleFileServing)

	http.ListenAndServe(":"+port, mux)
}

func groupConnect(s *re.Session) func(ws *websocket.Conn) {
	return func(ws *websocket.Conn) {
		var groupName string
		for {
			if err := websocket.Message.Receive(ws, &groupName); err != nil {
				fmt.Println("Can't receive")
			} else if groupName != "" {
				cursor, err := re.DB("together").Table(groupName).Run(s)
				if err != nil {
					fmt.Println(err, " in getting table values")
				}

				var response interface{}
				for cursor.Next(&response) {
					websocket.JSON.Send(ws, response)
				}

				cursor.Close()

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
		decoder := json.NewDecoder(req.Body)

		if parts[1] == "group" {

			if parts[2] == "create" {
				var group GroupInfo

				err := decoder.Decode(&group)
				if err != nil {
					fmt.Println("error extracting json")
				}

				err = re.DB("together").TableCreate(group.GroupName).Exec(s)
				if err != nil {
					w.WriteHeader(403)
					w.Write([]byte("Group exists"))
				} else {
					_, err = re.DB("together").Table("passwords").Insert(group).RunWrite(s)
					if err != nil {
						fmt.Println("error inserting password")
					}
					w.WriteHeader(201)
					w.Write([]byte("Group created"))
					go scheduleCloseGroup(group, 0)
				}
			} else if parts[2] == "postPhoto" {
				var photo PhotoData

				err := decoder.Decode(&photo)
				if err != nil {
					fmt.Println(err, " decoding JSON")
				}

				_, err = re.DB("together").Table(parts[3]).Insert(photo).RunWrite(s)
				if err != nil {
					fmt.Println(err, "insterting photo")
				}

				w.WriteHeader(201)
				w.Write([]byte("Photo saved"))
			} else if parts[2] == "login" {
				var group GroupInfo

				err := decoder.Decode(&group)
				if err != nil {
					fmt.Println("error extracting json")
				}

				result, err := re.DB("together").Table("passwords").Filter(group).Run(s)
				if err != nil {
					fmt.Printf("%v in find group password\n", err)
				}

				var value GroupInfo
				var status int
				var message string
				if result.Next(&value) {
					status = 200
					message = "Login Successfull"
				} else {
					status = 403
					message = "Incorrect Password"
				}

				w.WriteHeader(status)
				w.Write([]byte(message))
			}
		} else {
			w.WriteHeader(404)
			w.Write([]byte("You reached a dead end in the api!"))
			req.Body.Close()
		}
		req.Body.Close()
	}
}

func handleFileServing(w http.ResponseWriter, req *http.Request) {
	parts := strings.Split(req.URL.Path, "/")
	file := parts[len(parts)-1]

	contentType := "text/html"
	if strings.HasSuffix(file, ".css") {
		contentType = "text/css"
	} else if strings.HasSuffix(file, ".js") {
		contentType = "application/javascript"
	} else if strings.HasSuffix(file, ".ico") {
		contentType = "image/x-icon"
	}

	if contentType == "text/html" {
		file = "index.html"
	}

	filePath := http.Dir("./public/" + file)
	data, err := ioutil.ReadFile(string(filePath))
	if err == nil {
		w.Header().Add("Content-Type", contentType)
		w.WriteHeader(200)
		w.Write(data)
	} else {
		w.WriteHeader(404)
		w.Write([]byte("File does not exist"))
	}
}

func scheduleCloseGroup(group GroupInfo, attempts int) {
	if attempts == 3 {
		return
	}
	if attempts == 0 {
		time.Sleep(24 * time.Hour)
	}
	attempts++

	s, err := re.Connect(re.ConnectOpts{
		Address:  "127.0.0.1:28015",
		Database: "together",
	})
	if err == nil {
		re.DB("together").TableDrop(group.GroupName).Exec(s)
		re.DB("together").Table("passwords").Filter(group).Delete().RunWrite(s)
	} else {
		scheduleCloseGroup(group, attempts)
	}
}
