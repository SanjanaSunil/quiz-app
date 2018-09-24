package controller

import (
	"fmt"
	model "../model"
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"net/http"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" 
)

var err error

var (
	key = []byte("super-secret-key")
	store = sessions.NewCookieStore(key)
)

func Authenticate(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "cookie-name")
	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		ErrorResponse(w, http.StatusForbidden, "Forbidden")
		return
	}
	if str, ok := session.Values["user"].(string); ok {
		JSONResponse(w, http.StatusOK, map[string]string{"username": str})
	} else {
		ErrorResponse(w, http.StatusNotFound, err.Error())
	}
}

func GetUserType(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "cookie-name")
	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		ErrorResponse(w, http.StatusForbidden, "Forbidden")
		return
	}
	if str, ok := session.Values["type"].(string); ok {
		JSONResponse(w, http.StatusOK, map[string]string{"type": str})
	} else {
		ErrorResponse(w, http.StatusNotFound, err.Error())
	}
}

func GetUser(db *gorm.DB, response http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	var user model.User
	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
		ErrorResponse(response, http.StatusNotFound, err.Error())
	 	fmt.Println(err)
	} else {
		JSONResponse(response, http.StatusOK, user)
  	}
}
 
func GetUsers(db *gorm.DB, response http.ResponseWriter, request *http.Request) {
	var users []model.User
	if err := db.Find(&users).Error; err != nil {
		ErrorResponse(response, http.StatusNotFound, err.Error())
		fmt.Println(err)
  	} else {
		JSONResponse(response, http.StatusOK, users)
	}
}

func DeleteUser(db *gorm.DB, response http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	var users []model.User
	bytes := []byte(id)
	json.Unmarshal(bytes, &users)
	if err := db.Where("id = ?", id).First(&users).Delete(&users).Error; err != nil {
		ErrorResponse(response, http.StatusInternalServerError, err.Error())
		fmt.Println(err)
	} 
	JSONResponse(response, http.StatusNoContent, nil)
}

func SignUp(db *gorm.DB, response http.ResponseWriter, request *http.Request) {
	session, _ := store.Get(request, "cookie-name")
	var user model.User
	decoder := json.NewDecoder(request.Body)
	if err := decoder.Decode(&user); err != nil {
		ErrorResponse(response, http.StatusBadRequest, err.Error())
		return
	}
	defer request.Body.Close()
 	
	if err := db.Save(&user).Error; err != nil {
		ErrorResponse(response, http.StatusInternalServerError, err.Error())
		return
	}
	session.Values["authenticated"] = true
	session.Values["user"] = user.Username
	session.Values["type"] = user.Type
	session.Save(request, response)
	JSONResponse(response, http.StatusOK, user)
}

func SignIn(db *gorm.DB, response http.ResponseWriter, request *http.Request) {
	session, _ := store.Get(request, "cookie-name")
	var user model.User
	decoder := json.NewDecoder(request.Body)
	if err := decoder.Decode(&user); err != nil {
		ErrorResponse(response, http.StatusBadRequest, err.Error())
		return
	}
	defer request.Body.Close()
 
	if err := db.Where("username = ? AND password = ?", user.Username, user.Password).First(&user).Error; err != nil {
		ErrorResponse(response, http.StatusNotFound, err.Error())
		fmt.Println(err)
   	} else {
		session.Values["authenticated"] = true
		session.Values["user"] = user.Username
		session.Values["type"] = user.Type
		session.Save(request, response)
		JSONResponse(response, http.StatusOK, user)
	}
}

func Logout(db *gorm.DB, response http.ResponseWriter, request *http.Request) {
	session, _ := store.Get(request, "cookie-name")

	session.Options = &sessions.Options{
		MaxAge:	-1,
		HttpOnly: true,
	}
	session.Save(request, response)
}