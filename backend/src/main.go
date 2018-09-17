package main

import (
	"fmt"
	"log"
	"encoding/json"
	// "github.com/gin-contrib/cors"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/gorilla/securecookie"
	"net/http"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" 
)

var db *gorm.DB
var err error

var cookieHandler = securecookie.New(
	securecookie.GenerateRandomKey(64),
	securecookie.GenerateRandomKey(32))

type User struct {
	ID uint `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

var router = mux.NewRouter()

 func main() {

	db, err = gorm.Open("sqlite3", "./gorm.db")

	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
	  
	db.AutoMigrate(&User{})

	router.HandleFunc("/users", GetUsers)
	router.HandleFunc("/user/{username}", GetUser)
	// router.HandleFunc("/signup", SignUp).Methods("POST")

	corsObj := handlers.AllowedOrigins([]string{"*"})

	http.Handle("/", router)
	log.Fatal(http.ListenAndServe(":8000", handlers.CORS(corsObj)(router)))
}

// respondJSON makes the response with payload as json format
func respondJSON(w http.ResponseWriter, status int, payload interface{}) {
	response, err := json.Marshal(payload)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write([]byte(response))
}
 
// respondError makes the error response with payload as json format
func respondError(w http.ResponseWriter, code int, message string) {
	respondJSON(w, code, map[string]string{"error": message})
}

func GetUser(response http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	username := vars["username"]
	var user User
	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
	 	respondError(response, http.StatusNotFound, err.Error())
	 	fmt.Println(err)
	} else {
		respondJSON(response, http.StatusOK, user)
  	}
}
 
func GetUsers(response http.ResponseWriter, request *http.Request) {
	var users []User
	db.Find(&users)
	respondJSON(response, http.StatusOK, users)
}