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