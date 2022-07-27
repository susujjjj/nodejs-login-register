'use strict'

class UserStorage {
  //근데 알아야 될게, 데이터를 단순하게 검증하는 용도로  아래 static users 오브젝트처럼
  //개발할수있지만, 데이터를 저장하기 위해서는 아래처럼 구현하면 !!안된다!!

  static #users = {
    // static 설정해줘야 이 클래스 자체에서 이 변수에 접근할수 있게 된다
    // users 앞에 #을 붙임으로써 정보를 은닉화할수있다(public에서 private으로 바꿔줌)
    id: ['john200', 'SB', '김사수'],
    password: ['1234', '1234', '123456'],
    name: ['john', '나개발', '김팀장'],
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

  static getUserInfo(id) {
    //여기 파라미터로 id를 받을껀데, 이렇게 하는이유는
    //아이디에 해당하는 데이터 ex: SB password, name 이 데이터를 전달하는 메서드를 만들거임
    const users = this.#users
    const idx = users.id.indexOf(id)
    const userskeys = Object.keys(users) // users의 key값들만 list로 만듬 => [id, password, name]이런배열만들어짐
    console.log(userskeys, 'userskeys??')
    const userInfo = userskeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx]
      return newUser
    }, {})
    return userInfo
  }

  static save(userInfo) {
    const users = this.#users
    users.id.push(userInfo.id)
    users.name.push(userInfo.name)
    users.password.push(userInfo.password)
    return { success: true }
  }
}

module.exports = UserStorage
