package api

import (
	"fmt"
	"log"
	controller "./controller"
	model "./model"
	"github.com/gorilla/mux"
	"net/http"
	"github.com/rs/cors"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" 
)

var db *gorm.DB
var err error

var router = mux.NewRouter()

func Run() {

	db, err = gorm.Open("sqlite3", "./gorm.db")

	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
	  
	db.AutoMigrate(&model.User{})

	router.HandleFunc("/users", GetUsers).Methods("GET")
	router.HandleFunc("/user", Authenticate).Methods("GET")
	router.HandleFunc("/type", GetUserType).Methods("GET")
	router.HandleFunc("/user/{id}", GetUser).Methods("GET")
	router.HandleFunc("/user/{id}", DeleteUser).Methods("DELETE")
	router.HandleFunc("/signup", SignUp).Methods("POST")
	router.HandleFunc("/signin", SignIn).Methods("POST")
	router.HandleFunc("/logout", Logout).Methods("POST")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		// AllowedHeaders: []string{"Content-Type"},
		AllowCredentials: true,
		AllowedMethods: []string{"GET", "HEAD", "POST", "PUT", "DELETE"},
		Debug: true,
	})

	http.Handle("/", router)
	log.Fatal(http.ListenAndServe(":8000", c.Handler(router)))
}

func Authenticate(w http.ResponseWriter, r *http.Request) {
	controller.Authenticate(db, w, r)
}

func GetUserType(w http.ResponseWriter, r *http.Request) {
	controller.GetUserType(db, w, r)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	controller.GetUser(db, w, r)
}
 
func GetUsers(w http.ResponseWriter, r *http.Request) {
	controller.GetUsers(db, w, r)
}

func DeleteUser(w http.ResponseWriter, r*http.Request) {
	controller.DeleteUser(db, w, r)
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	controller.SignUp(db, w, r)
}

func SignIn(w http.ResponseWriter, r *http.Request) {
	controller.SignIn(db, w, r)
}

func Logout(w http.ResponseWriter, r *http.Request) {
	controller.Logout(db, w, r)
}