package controller

import (
	"fmt"
	model "../model"
	"github.com/gorilla/mux"
	"encoding/json"
	"net/http"
	"io/ioutil"
	"bytes"
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

func GetQuestionOptions(db *gorm.DB, response http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	question_id := vars["question_id"]
	var options []model.Option
	bytes := []byte(question_id)
	json.Unmarshal(bytes, &options)
	if err := db.Where("question_id = ?", question_id).Find(&options).Error; err != nil {
		ErrorResponse(response, http.StatusNotFound, err.Error())
	 	fmt.Println(err)
	} else {
		JSONResponse(response, http.StatusOK, options)
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

func CreateOption(opt string, answer string, question_id uint, db *gorm.DB, response http.ResponseWriter) {
	var option model.Option
	option.Option = opt
	option.Answer = answer
	option.QuestionId = question_id
	if err := db.Save(&option).Error; err != nil {
		ErrorResponse(response, http.StatusInternalServerError, err.Error())
		return
	}
}

func CreateQuizQuestion(db *gorm.DB, response http.ResponseWriter, request *http.Request) {
	var question model.Question
	buf, _ := ioutil.ReadAll(request.Body)
	rdr1 := ioutil.NopCloser(bytes.NewBuffer(buf))
	rdr2 := ioutil.NopCloser(bytes.NewBuffer(buf))
	decoder := json.NewDecoder(rdr1)
	if err := decoder.Decode(&question); err != nil {
		ErrorResponse(response, http.StatusBadRequest, err.Error())
		return
	}
	defer rdr1.Close()
	if err := db.Save(&question).Error; err != nil {
		ErrorResponse(response, http.StatusInternalServerError, err.Error())
		return
	}

	var tempoptions model.TempOptionList
	request.Body = rdr2
	decoder = json.NewDecoder(request.Body)
	if err := decoder.Decode(&tempoptions); err != nil {
		ErrorResponse(response, http.StatusBadRequest, err.Error())
		return
	}
	defer request.Body.Close()

	CreateOption(tempoptions.Option1, tempoptions.Answer1, question.ID, db, response)
	CreateOption(tempoptions.Option2, tempoptions.Answer2, question.ID, db, response)
	CreateOption(tempoptions.Option3, tempoptions.Answer3, question.ID, db, response)
	CreateOption(tempoptions.Option4, tempoptions.Answer4, question.ID, db, response)
}

func SubmitScore(db *gorm.DB, response http.ResponseWriter, request *http.Request) {
	var score model.Score
	decoder := json.NewDecoder(request.Body)
	if err := decoder.Decode(&score); err != nil {
		ErrorResponse(response, http.StatusBadRequest, err.Error())
		return
	}
	defer request.Body.Close()
	if err := db.Save(&score).Error; err != nil {
		ErrorResponse(response, http.StatusInternalServerError, err.Error())
		return
	}
	JSONResponse(response, http.StatusOK, score)
}

func GetUserScores(db *gorm.DB, response http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	user := vars["user"]
	var scores []model.Score
	if err := db.Where("username = ?", user).Find(&scores).Error; err != nil {
		ErrorResponse(response, http.StatusNotFound, err.Error())
		fmt.Println(err)
  	} else {
		JSONResponse(response, http.StatusOK, scores)
	}
}