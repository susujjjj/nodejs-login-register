'user strict'

const express = require('express')
const router = express.Router()

const ctrl = require('./home.ctrl')

router.get('/', ctrl.home)

router.get('/login', ctrl.login)
// router.get('/login', (req, res) => {
//   res.render('home/login')
// })

module.exports = router //라우터를 사용할수있도록 외부로 내보내기
