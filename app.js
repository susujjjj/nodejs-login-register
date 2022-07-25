const express = require('express')
const app = express()

app.get('/', () => {
  //이처럼 세미콜론 꼭해줘야함
})
app.listen(3000, function () {
  console.log('서버 가동')
})
