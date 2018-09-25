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

type TempOptionList struct {
	Option1 string
	Answer1 string
	Option2 string
	Answer2 string 
	Option3 string 
	Answer3 string 
	Option4 string 
	Answer4 string
}