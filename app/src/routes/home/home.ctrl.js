'use strict'

const User = require('../../models/User')
// const UserStorage = require('../../models/UserStorage')

const output = {
  home: (req, res) => {
    res.render('home/index')
  },
  login: (req, res) => {
    res.render('home/login')
  },
  register: (req, res) => {
    res.render('home/register')
  },
}

//이런 데이터를 컨트롤러가 가지고있으면 안되므로 빼두겠다 절대 네버!!안됨
//모델로 별도로 분리해준 후에,  그 모델이 해당 데이터를 가지고 있도록 구현해줘야 함
// const users = {
//   id: ['woorimIT', 'SB', '김사수'],
//   password: ['1234', '1234', '123456'],
// }

const process = {
  //이제 이 컨트롤러는 UserStorage에 저장하지 않습니다 그래서 지워줌
  login: async (req, res) => {
    const user = new User(req.body)
    const response = await user.login()
    return res.json(response)
    // console.log(response, 'resss')
    //return res.json(response) //이 response를 클라이언트한테 json의 형태로 응답해줄거다
    //그럼 단 이 세줄로 로직이 끝나버리는것

    // const id = req.body.id,
    //   password = req.body.password
    // const users = UserStorage.getUsers('id', 'password')
    // const response = {}
    // if (users.id.includes(id)) {
    //   const idx = users.id.indexOf(id)
    //   if (users.password[idx] === password) {
    //     response.success = true
    //     return res.json(response)
    //   }
    // }
    // response.success = false
    // response.msg = '로그인에 실패했습니다.'

    //console.log(req.body) // back단에서 이 body를 보려면 어떤 모듈을 설치해줘야하는데 body를 잘 파싱 하기위해서
  },
  register: (req, res) => {
    const user = new User(req.body)
    const response = user.register()
    return res.json(response) //register의 반환값을 받아서 json 메서드를 통해서 클라이언트로 응답해주게 됨
  },
}

module.exports = {
  output,
  process,
}
