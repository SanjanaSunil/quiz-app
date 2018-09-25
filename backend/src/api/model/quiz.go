package model

type Quiz struct {
	ID uint `json:"id"`
	Genre string `json:"genre"`
}

type Question struct {
	ID uint `json:"id"`
	GenreId uint `json:"genre_id"`
	Question string `json:"question"`
}

type Option struct {
	ID uint `json:"id"`
	QuestionId uint `json:"question_id"`
	Option string `json:"option"`
	Answer string `json:"answer"`
}