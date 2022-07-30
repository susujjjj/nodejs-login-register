'use strict'

//이 유저스 제이슨. 유저스테이블에 접근해서 파일을 읽을수있도록 해주려면 파일시스템 불러오기
// const fs = require('fs').promises
const db = require('../config/db')

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
  // static getUsers(isAll, ...fields) {}

  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?;'
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`)
        else resolve(data[0])
      })
    })
  }

  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO (id, name, password) VALUES(?, ?, ?);'
      //물음표는 위 getUserInfo 쿼리에 물읆표랑 같은거에요
      db.query(
        query, //첫번째 파라미터는 쿼리떤지고
        [userInfo.id, userInfo.name, userInfo.password],
        //두번째 파라미터는 위 물음표에 대입될 변수들을 넣어주고
        (
          err,
          //data
        ) => {
          //이건단순이 INSERT로 저장하는거기때문에  따로 데이터를 받을게 없음. 그래서 데이터인자를 그냥 없애버림
          //err data분기하기
          if (err) reject(`${err}`)
          else resolve({ success: true })
        },
      ) //이건단순이 INSERT로 저장하는거기때문에  따로 데이터를 받을게 없음. 그래서 데이터인자를 그냥 없애버림
    })
  }
}

module.exports = UserStorage
