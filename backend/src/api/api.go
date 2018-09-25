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

	db, err = gorm.Open("sqlite3", "./database/gorm.db")

	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
	  
	db.AutoMigrate(&model.User{}, &model.Quiz{})

	router.HandleFunc("/users", GetUsers).Methods("GET")
	router.HandleFunc("/user", Authenticate).Methods("GET")
	router.HandleFunc("/type", GetUserType).Methods("GET")
	router.HandleFunc("/user/{id}", GetUser).Methods("GET")
	router.HandleFunc("/user/{id}", DeleteUser).Methods("POST")
	router.HandleFunc("/signup", SignUp).Methods("POST")
	router.HandleFunc("/signin", SignIn).Methods("POST")
	router.HandleFunc("/logout", Logout).Methods("POST")

	router.HandleFunc("/genres", GetQuizGenres).Methods("GET")
	router.HandleFunc("/question/{question_id}", GetQuestionOptions).Methods("GET")
	router.HandleFunc("/genre/{genre_id}", GetGenreQuestions).Methods("GET")
	router.HandleFunc("/create/genre", CreateQuizGenre).Methods("POST")
	router.HandleFunc("/question", CreateQuizQuestion).Methods("POST")

	router.HandleFunc("/score", SubmitScore).Methods("POST")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		// AllowedHeaders: []string{"Content-Type"},
		AllowCredentials: true,
		AllowedMethods: []string{"GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"},
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

func GetQuizGenres(w http.ResponseWriter, r *http.Request) {
	controller.GetQuizGenres(db, w, r)
}

func GetQuestionOptions(w http.ResponseWriter, r *http.Request) {
	controller.GetQuestionOptions(db, w, r)
}

func GetGenreQuestions(w http.ResponseWriter, r *http.Request) {
	controller.GetGenreQuestions(db, w, r)
}

func CreateQuizGenre(w http.ResponseWriter, r *http.Request) {
	controller.CreateQuizGenre(db, w, r)
}

func CreateQuizQuestion(w http.ResponseWriter, r *http.Request) {
	controller.CreateQuizQuestion(db, w, r)
}

func SubmitScore(w http.ResponseWriter, r *http.Request) {
	controller.SubmitScore(db, w, r)
}