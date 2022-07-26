'use strict'

//모듈
const express = require('express')
const app = express()

//라우팅
const home = require('./src/routes/home') //폴더를 상대적으로 명시해줘야해요. 현재 폴더에서 routes

//앱 셋팅
app.set('views', './src/views') //이 화면 views를 관리해줄 파일이 저장될 폴더이름을 두번째 파라미터로 넘겨주면된다
app.set('view engine', 'ejs') //ejs는 굉장히 많이 사용하는 뷰 엔진중 하나
app.use(express.static(`${__dirname}/src/public`)) //이 디렉터리 네임은, 현재 app.js파일이 있는 위치를 반환
//위치 안에있는 src폴더 안에 있는 Public폴더를, 정적경로로 추가해주겠다는것 그리고 src안에 public이라는 폴더를 추가해준다.

app.use('/', home) //루트로 들어오면 홈으로 이동하게 되는것 ! 그래서 결과적으로는 routes/home/index.js파일로 들어와서
// index.js 안에 router.get("/") 이 경로에 따라서 해당 콜백함수(res.render("home/index"))가 실행되는원리.
//use는 미들웨어를 등록해주는 메소드에요

module.exports = app
