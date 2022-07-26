'use strict'

const output = {
  home: (req, res) => {
    res.render('home/index')
  },

  login: (req, res) => {
    res.render('home/login')
  },
}

const users = {
  id: ['woorimIT', 'SB', '김사수'],
  password: ['1234', '1234', '123456'],
}

const process = {
  login: (req, res) => {
    const id = req.body.id,
      password = req.body.password

    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id)
      if (users.password[idx] === password) {
        return res.json({
          success: true,
        })
      }
    }

    return res.json({
      success: false,
      msg: '로그인에 실패했습니다.',
    })
    //console.log(req.body) // back단에서 이 body를 보려면 어떤 모듈을 설치해줘야하는데 body를 잘 파싱 하기위해서
  },
}

module.exports = {
  output,
  process,
}
