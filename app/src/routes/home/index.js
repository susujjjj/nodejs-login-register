'user strict'

const express = require('express')
const router = express.Router()

const ctrl = require('./home.ctrl')

router.get('/', ctrl.output.home)
router.get('/login', ctrl.output.login)
router.get('/register', ctrl.output.register)

router.post('/login', ctrl.process.login)
router.post('/register', ctrl.process.register)

module.exports = router //라우터를 사용할수있도록 외부로 내보내기
