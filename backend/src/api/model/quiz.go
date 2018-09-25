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
	Option1 string `json:"option1"`
	Answer1 string `json:"answer1"`
	Option2 string `json:"option2"`
	Answer2 string `json:"answer2"`
	Option3 string `json:"option3"`
	Answer3 string `json:"answer3"`
	Option4 string `json:"option4"`
	Answer4 string `json:"answer4"`
}