package controller

import (
	"fmt"
	model "../model"
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