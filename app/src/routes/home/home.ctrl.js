'use strict'

const UserStorage = require('../../models/UserStorage')

const output = {
  home: (req, res) => {
    res.render('home/index')
  },

  login: (req, res) => {
    res.render('home/login')
  },
}

//이런 데이터를 컨트롤러가 가지고있으면 안되므로 빼두겠다 절대 네버!!안됨
//모델로 별도로 분리해준 후에,  그 모델이 해당 데이터를 가지고 있도록 구현해줘야 함
// const users = {
//   id: ['woorimIT', 'SB', '김사수'],
//   password: ['1234', '1234', '123456'],
// }

const process = {
  login: (req, res) => {
    const id = req.body.id,
      password = req.body.password

    const users = UserStorage.getUsers('id', 'password')

    const response = {}
    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id)
      if (users.password[idx] === password) {
        response.success = true
        return res.json(response)
      }
    }

    response.success = false
    response.msg = '로그인에 실패했습니다.'
    return res.json(response)
    //console.log(req.body) // back단에서 이 body를 보려면 어떤 모듈을 설치해줘야하는데 body를 잘 파싱 하기위해서
  },
}

module.exports = {
  output,
  process,
}
