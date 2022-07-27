'use strict'
//프론트엔드 화면

const id = document.querySelector('#id'),
  name = document.querySelector('#name'),
  password = document.querySelector('#password'),
  passwordConfirm = document.querySelector('#password-confirm'),
  registerBtn = document.querySelector('#button')

registerBtn.addEventListener('click', register) //이 두번째 파라미터로 넘어오는것은 함수

function register() {
  if (!id.value) return alert('please input id')
  if (password.value !== passwordConfirm.value)
    return alert('password is not correct.')

  const req = {
    id: id.value,
    name: name.value,
    password: password.value,
    // passwordConfirm: passwordConfirm.value, 비밀번호확인은 여기서 필요하지않고 서버에 보내는건 id name pw므로 삭제하기
  }

  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = '/login'
      } else {
        alert(res.msg)
      }
    })
    .catch((err) => {
      console.error('회원가입 중 에러 발생')
    })
}
