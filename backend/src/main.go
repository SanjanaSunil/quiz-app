package main

import (
	"fmt"
	"log"
	"encoding/json"
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

func setSession(userName string, response http.ResponseWriter) {
	value := map[string]string{
		"Username": userName,
	}
	if encoded, err := cookieHandler.Encode("session", value); err == nil {
		cookie := &http.Cookie{
			Name:  "session",
			Value: encoded,
			Path:  "/",
		}
		http.SetCookie(response, cookie)
	}
}

func clearSession(response http.ResponseWriter) {
	cookie := &http.Cookie{
		Name:   "session",
		Value:  "",
		Path:   "/",
		MaxAge: -1,
	}
	http.SetCookie(response, cookie)
}

// ---------------------------------------------------------------

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
	router.HandleFunc("/user/{id}", GetUser)
	router.HandleFunc("/user", GetUserName)
	router.HandleFunc("/user/{id}", DeleteUser).Methods("DELETE")
	router.HandleFunc("/signup", SignUp).Methods("POST")
	router.HandleFunc("/signin", SignIn).Methods("POST")
	router.HandleFunc("/logout", Logout).Methods("POST")

	corsObj := handlers.AllowedOrigins([]string{"*"})

	http.Handle("/", router)
	log.Fatal(http.ListenAndServe(":8000", handlers.CORS(corsObj)(router)))
}

// ----------------------------------------------------

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

// ---------------------------------------------

func GetUserName(response http.ResponseWriter, request *http.Request) {
	var userName string
	if cookie, err := request.Cookie("session"); err == nil {
		cookieValue := make(map[string]string)
		if err = cookieHandler.Decode("session", cookie.Value, &cookieValue); err == nil {
			userName = cookieValue["Username"]
		}
	}
	respondJSON(response, http.StatusOK, userName)
}	

func GetUser(response http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	var user User
	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
	 	respondError(response, http.StatusNotFound, err.Error())
	 	fmt.Println(err)
	} else {
		respondJSON(response, http.StatusOK, user)
  	}
}
 
func GetUsers(response http.ResponseWriter, request *http.Request) {
	var users []User
	if err := db.Find(&users).Error; err != nil {
		respondError(response, http.StatusNotFound, err.Error())
		fmt.Println(err)
  	} else {
		respondJSON(response, http.StatusOK, users)
	}
}

func DeleteUser(response http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	var user User
	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
		respondError(response, http.StatusNotFound, err.Error())
		fmt.Println(err)
   	}
   	if err := db.Delete(&user).Error; err != nil {
		respondError(response, http.StatusInternalServerError, err.Error())
		fmt.Println(err)
		return
	}
	respondJSON(response, http.StatusNoContent, nil)
}

func SignUp(response http.ResponseWriter, request *http.Request) {
	var user User
	decoder := json.NewDecoder(request.Body)
	if err := decoder.Decode(&user); err != nil {
		respondError(response, http.StatusBadRequest, err.Error())
		return
	}
	defer request.Body.Close()
 
	if err := db.Save(&user).Error; err != nil {
		fmt.Println("WHY IS THIS HAPPENING %s", user)
		respondError(response, http.StatusInternalServerError, err.Error())
		return
	}
	setSession(user.Username, response)
	respondJSON(response, http.StatusCreated, user)
}

func SignIn(response http.ResponseWriter, request *http.Request) {
	var user User
	decoder := json.NewDecoder(request.Body)
	if err := decoder.Decode(&user); err != nil {
		respondError(response, http.StatusBadRequest, err.Error())
		return
	}
	defer request.Body.Close()
 
	if err := db.Where("username = ?", user.Username).First(&user).Error; err != nil {
		respondError(response, http.StatusNotFound, err.Error())
		fmt.Println(err)
   	} else {
		setSession(user.Username, response)
	   	respondJSON(response, http.StatusOK, user)
	}
}

func Logout(response http.ResponseWriter, request *http.Request) {
	clearSession(response)
}