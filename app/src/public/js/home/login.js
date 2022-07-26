'use strict'

const id = document.querySelector('#id'),
  password = document.querySelector('#password'),
  loginBtn = document.querySelector('button')

loginBtn.addEventListener('click', login) //이 두번째 파라미터로 넘어오는것은 함수

function login() {
  const req = {
    id: id.value,
    password: password.value,
  }
  console.log('bye')
}
