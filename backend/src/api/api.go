package api

import (
	"fmt"
	"log"
	"encoding/json"
	handler "./handler"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"net/http"
	"github.com/rs/cors"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" 
)

var db *gorm.DB
var err error

var (
	key = []byte("super-secret-key")
	store = sessions.NewCookieStore(key)
)

type User struct {
	ID uint `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

var router = mux.NewRouter()

 func Run() {

	db, err = gorm.Open("sqlite3", "./gorm.db")

	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
	  
	db.AutoMigrate(&User{})

	router.HandleFunc("/users", GetUsers)
	router.HandleFunc("/user", Authenticate)
	router.HandleFunc("/user/{id}", GetUser)
	router.HandleFunc("/user/{id}", DeleteUser).Methods("DELETE")
	router.HandleFunc("/signup", SignUp).Methods("POST")
	router.HandleFunc("/signin", SignIn).Methods("POST")
	router.HandleFunc("/logout", Logout).Methods("POST")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowCredentials: true,
	})

	http.Handle("/", router)
	log.Fatal(http.ListenAndServe(":8000", c.Handler(router)))
}

func Authenticate(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "cookie-name")
	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		handler.ErrorResponse(w, http.StatusForbidden, "Forbidden")
		return
	}
	if str, ok := session.Values["user"].(string); ok {
		handler.JSONResponse(w, http.StatusOK, map[string]string{"username": str})
	} else {
		handler.ErrorResponse(w, http.StatusNotFound, err.Error())
	}
}

func GetUser(response http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	var user User
	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
		handler.ErrorResponse(response, http.StatusNotFound, err.Error())
	 	fmt.Println(err)
	} else {
		handler.JSONResponse(response, http.StatusOK, user)
  	}
}
 
func GetUsers(response http.ResponseWriter, request *http.Request) {
	var users []User
	if err := db.Find(&users).Error; err != nil {
		handler.ErrorResponse(response, http.StatusNotFound, err.Error())
		fmt.Println(err)
  	} else {
		handler.JSONResponse(response, http.StatusOK, users)
	}
}

func DeleteUser(response http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	var user User
	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
		handler.ErrorResponse(response, http.StatusNotFound, err.Error())
		fmt.Println(err)
   	}
   	if err := db.Delete(&user).Error; err != nil {
		handler.ErrorResponse(response, http.StatusInternalServerError, err.Error())
		fmt.Println(err)
		return
	}
	handler.JSONResponse(response, http.StatusNoContent, nil)
}

func SignUp(response http.ResponseWriter, request *http.Request) {
	session, _ := store.Get(request, "cookie-name")
	var user User
	decoder := json.NewDecoder(request.Body)
	if err := decoder.Decode(&user); err != nil {
		handler.ErrorResponse(response, http.StatusBadRequest, err.Error())
		return
	}
	defer request.Body.Close()
 	
	if err := db.Save(&user).Error; err != nil {
		handler.ErrorResponse(response, http.StatusInternalServerError, err.Error())
		return
	}
	session.Values["authenticated"] = true
	session.Values["user"] = user.Username
	session.Save(request, response)
	handler.JSONResponse(response, http.StatusOK, user)
}

func SignIn(response http.ResponseWriter, request *http.Request) {
	session, _ := store.Get(request, "cookie-name")
	var user User
	decoder := json.NewDecoder(request.Body)
	if err := decoder.Decode(&user); err != nil {
		handler.ErrorResponse(response, http.StatusBadRequest, err.Error())
		return
	}
	defer request.Body.Close()
 
	if err := db.Where("username = ? AND password = ?", user.Username, user.Password).First(&user).Error; err != nil {
		handler.ErrorResponse(response, http.StatusNotFound, err.Error())
		fmt.Println(err)
   	} else {
		session.Values["authenticated"] = true
		session.Values["user"] = user.Username
		session.Save(request, response)
		handler.JSONResponse(response, http.StatusOK, user)
	}
}

func Logout(response http.ResponseWriter, request *http.Request) {
	session, _ := store.Get(request, "cookie-name")

	session.Options = &sessions.Options{
		MaxAge:	-1,
		HttpOnly: true,
	}
	session.Save(request, response)
}