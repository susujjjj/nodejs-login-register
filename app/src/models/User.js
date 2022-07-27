'use strict'

//이 user class에서 userStorage안에 접근을 해서 데이터를 가져와야겠죠?
//그래서 아래와같이 지정해줌 (로그인메서드안에서 사용함)
const UserStorage = require('./UserStorage')

class User {
  constructor(body) {
    // body를 받고
    this.body = body //이 body가 user의 body안으로 들어가게된다
  } //그럼이 body를 언제 넘기냐? 다시 home.ctrl.js로 넘어가보자
  // 아래코드는  home.ctrl.js에 있는 코드인데 저기 req.body가 이 user class의
  //body 인자로 들어옵니다. 그래서 이 this.body로 들어오게되겠죠 ?
  //const process = {
  // login: (req, res) => {
  //   new User(req.body)

  //로그인 메서드 만들기

  login() {
    const body = this.body
    //const { id, password } = UserStorage.getUsers('id', 'password') //먼저 작성한getUsers대신에 getUserInfo로하고 아이디값을 던질거다
    const { id, password } = UserStorage.getUserInfo(body.id) //이렇게 id값을던지면

    //스토리지에서 가져온 id랑, 클라이언트가 입력한 body의 id가 같고,
    //스토리지의 password와 클라이언트가 입력한 패스워드가 같은지
    if (id) {
      if (id === body.id && password === body.password) {
        return { success: true }
      }
      //id는 있는데 비번이 다르면
      return { success: false, msg: '비밀번호가 틀렸습니다.' }
    }
    return { success: false, msg: '존재하지 않는 아이디입니다.' }
  }
}

module.exports = User
