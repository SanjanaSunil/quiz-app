package controller

import (
	"fmt"
	model "../model"
	"github.com/gorilla/mux"
	"encoding/json"
	"net/http"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" 
)

func GetQuizGenres(db *gorm.DB, response http.ResponseWriter, request *http.Request) {
	var quizzes []model.Quiz
	if err := db.Find(&quizzes).Error; err != nil {
		ErrorResponse(response, http.StatusNotFound, err.Error())
		fmt.Println(err)
  	} else {
		JSONResponse(response, http.StatusOK, quizzes)
	}
}

func GetGenreQuestions(db *gorm.DB, response http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	genre_id := vars["genre_id"]
	var questions []model.Question
	bytes := []byte(genre_id)
	json.Unmarshal(bytes, &questions)
	if err := db.Where("genre_id = ?", genre_id).Find(&questions).Error; err != nil {
		ErrorResponse(response, http.StatusNotFound, err.Error())
	 	fmt.Println(err)
	} else {
		JSONResponse(response, http.StatusOK, questions)
  	}

}

func CreateQuizGenre(db *gorm.DB, response http.ResponseWriter, request *http.Request) {
	var quiz model.Quiz
	decoder := json.NewDecoder(request.Body)
	if err := decoder.Decode(&quiz); err != nil {
		ErrorResponse(response, http.StatusBadRequest, err.Error())
		return
	}
	defer request.Body.Close()
	if err := db.Save(&quiz).Error; err != nil {
		ErrorResponse(response, http.StatusInternalServerError, err.Error())
		return
	}
}

func CreateQuizQuestion(db *gorm.DB, response http.ResponseWriter, request *http.Request) {
	var question []model.Question
	decoder := json.NewDecoder(request.Body)
	if err := decoder.Decode(&question); err != nil {
		ErrorResponse(response, http.StatusBadRequest, err.Error())
		return
	}
	defer request.Body.Close()
	if err := db.Save(&question).Error; err != nil {
		ErrorResponse(response, http.StatusInternalServerError, err.Error())
		return
	}
}