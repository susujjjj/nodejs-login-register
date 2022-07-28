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

  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data) //이 파라미터의 데이터를 파싱해서 우리가 받을수있는데이터로 바뀐것을 users안에 넣어줬고 정상적으로 동작하겠다
    if (isAll) return users //isAll이 트루면바로 받아오도록
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field]
      }
      return newUsers
    }, {})
    return newUsers
  }
  //이 users에 은닉화된 private변수를 반환해준다
  static getUsers(isAll, ...fields) {
    return fs
      .readFile('./src/databases/users.json')
      .then((data) => {
        console.log(data, 'data?')
        return this.#getUsers(data, isAll, fields)
      })
      .catch(console.error)
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

  static async save(userInfo) {
    //users.json파일의 데이터를 읽어온다음에. 그 데이터의
    //우리가 추가하고 싶은 데이터를 추가한 뒤에, 두번째파라미터에 data를 넣어줘야한다
    //유저스라는 데이터를 모두다 불러오는 메서드를 만들었었다. (static getUser()//)
    //그 메서드를 이용해주겠다.
    const users = await this.getUsers(true) //모든 파라미터를 다 받아와주겠다라는의미

    //users에 데이터 추가하기!
    if (users.id.includes(userInfo.id)) {
      //클라이언트가 입력안 유저정보아이디가  데이터베이스 안의 아이디에 포함되어있지 않으면
      //데이터베이스에 이미 존재하는 아이디일경우
      throw '이미 존재하는 아이디입니다.'
    }
    users.id.push(userInfo.id) //파일에 데이터 저장해주기
    users.name.push(userInfo.name)
    users.password.push(userInfo.password)
    //위처럼 이렇게하면 데이터를 오브젝트 형태로 반환해서 users가 갖고있을거임 거기에
    //데이터를 추가한 다음에 추가된 users데이터를 두번째 파람에넘긴다
    fs.writeFile('./src/databases/users.json', JSON.stringify(users)) ////저장된 데이터를  JSON.stringify를 통해서 저장하고, 저장이 완료되면, 이 메소드는 아무것도 반환하지 않음.
    //오류가 낫을때만 에러 던져버림 .따라서 아래에 반환해주기
    return { success: true } //성공하면 true반환

    // users.id.push(userInfo.id)
    // users.name.push(userInfo.name)
    // users.password.push(userInfo.password)
    // return { success: true }
  }
}

module.exports = UserStorage
