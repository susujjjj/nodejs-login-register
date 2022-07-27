'use strict'
//프론트엔드 화면

const id = document.querySelector('#id'),
  password = document.querySelector('#password'),
  loginBtn = document.querySelector('#button')

loginBtn.addEventListener('click', login) //이 두번째 파라미터로 넘어오는것은 함수

function login() {
  const req = {
    id: id.value,
    password: password.value,
  }

  console.log(req, 'req?')

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      // if (res.success) {
      //   location.href = '/'
      // } else {
      //   alert(res.msg)
      // }
    })
    .catch((err) => {
      console.error('로그인 중 에러 발생')
    })
}
