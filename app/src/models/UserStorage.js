'use strict'

//이 유저스 제이슨. 유저스테이블에 접근해서 파일을 읽을수있도록 해주려면 파일시스템 불러오기
const fs = require('fs').promises

class UserStorage {
  //은닉화
  static #getUserInfo(data, id) {
    const users = JSON.parse(data)
    const idx = users.id.indexOf(id)
    const userskeys = Object.keys(users) // users의 key값들만 list로 만듬 => [id, password, name]이런배열만들어짐
    const userInfo = userskeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx]
      return newUser
    }, {})
    return userInfo
  }
  //근데 알아야 될게, 데이터를 단순하게 검증하는 용도로  아래 static users 오브젝트처럼
  //개발할수있지만, 데이터를 저장하기 위해서는 아래처럼 구현하면 !!안된다!!

  //아래 데이터 오브젝트 /src/database/databaseName/users.json으로 이동했음
  // static #users = {
  //   // static 설정해줘야 이 클래스 자체에서 이 변수에 접근할수 있게 된다
  //   // users 앞에 #을 붙임으로써 정보를 은닉화할수있다(public에서 private으로 바꿔줌)
  //   id: ['john200', 'SB', '김사수'],
  //   password: ['1234', '1234', '123456'],
  //   name: ['john', '나개발', '김팀장'],
  // }

  //이 users에 은닉화된 private변수를 반환해준다
  static getUsers(...fields) {
    // const users = this.#users
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field]
      }
      return newUsers
    }, {})
    return newUsers
  }

  static getUserInfo(id) {
    console.log(id, 'id?')
    //여기 파라미터로 id를 받을껀데, 이렇게 하는이유는
    //아이디에 해당하는 데이터 ex: SB password, name 이 데이터를 전달하는 메서드를 만들거임
    return fs
      .readFile('./src/databases/users.json')
      .then((data) => {
        console.log(data, 'data?')
        return this.#getUserInfo(data, id)
      })
      .catch(console.error)
  }

  static save(userInfo) {
    // const users = this.#users
    users.id.push(userInfo.id)
    users.name.push(userInfo.name)
    users.password.push(userInfo.password)
    return { success: true }
  }
}

module.exports = UserStorage
