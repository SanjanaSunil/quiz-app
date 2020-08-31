我是光年实验室高级招聘经理。
我在github上访问了你的开源项目，你的代码超赞。你最近有没有在看工作机会，我们在招软件开发工程师，拉钩和BOSS等招聘网站也发布了相关岗位，有公司和职位的详细信息。
我们公司在杭州，业务主要做流量增长，是很多大型互联网公司的流量顾问。公司弹性工作制，福利齐全，发展潜力大，良好的办公环境和学习氛围。
公司官网是http://www.gnlab.com,公司地址是杭州市西湖区古墩路紫金广场B座，若你感兴趣，欢迎与我联系，
电话是0571-88839161，手机号：18668131388，微信号：echo 'bGhsaGxoMTEyNAo='|base64 -D ,静待佳音。如有打扰，还请见谅，祝生活愉快工作顺利。

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
