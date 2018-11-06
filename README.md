# Quiz App

## Introduction

A quiz app using Go for the backend and React for the frontend along with RESTful API. 

## Running the app

The packages used in go are:
* github.com/gorilla/mux
* github.com/rs/cors
* github.com/jinzhu/gorm
* github.com/jinzhu/gorm/dialects/sqlite
* github.com/gorilla/sessions 

They can be installed using:
```bash
              go get -u -v github.com/gorilla/mux
              go get -u -v github.com/rs/cors
	      go get -u -v github.com/jinzhu/gorm
              go get -u -v github.com/jinzhu/gorm/dialects/sqlite
              go get -u -v github.com/gorilla/sessions
```

To run the app:

* Navigate to the _go/src_ directory and run the following commands:

    ```
        go run main.go
    ```
* Navigate to the _react-app/_ directory and run the following commands:
    ```
        npm install
        yarn start
    ```
* Vist localhost:3000/

## Features

* Login/Registration
* Quizzes, each of which has multiple choice questions
* Admin login (admin can create, edit, delete quizzes and quiz questions)
* Scoreboard that tracks all the quizzes that the user has ever played
* Leaderboard that shows the highest in each quiz
* Each quiz has three lives
