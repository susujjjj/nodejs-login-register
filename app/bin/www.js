'use strict'

const app = require('../app')
const PORT = process.env.PORT || 3000

//서버 띄워주는 코드
//현재 이파일안에서 이 앱이라는것을 찾을수가 없음 그러므로 app 불러와줘야함
app.listen(PORT, () => {
  console.log('서버 가동')
})

//해당 파일로 실행시킬때는 node ./bin/www.js
