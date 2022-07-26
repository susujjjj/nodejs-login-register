'use strict'

class UserStorage {
  static #users = {
    // static 설정해줘야 이 클래스 자체에서 이 변수에 접근할수 있게 된다
    id: ['woorimIT', 'SB', '김사수'],
    password: ['1234', '1234', '123456'],
    name: ['우리밋', '나개발', '김팀장'],
  }

  //이 users에 은닉화된 private변수를 반환해준다
  static getUsers(...fields) {
    const users = this.#users
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field]
      }
      return newUsers
    }, {})
    return newUsers
  }
}

module.exports = UserStorage
