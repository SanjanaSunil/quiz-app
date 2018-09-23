package controller

import (
	"fmt"
	model "../model"
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