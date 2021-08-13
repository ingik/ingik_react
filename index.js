const express = require('express');
//express 모듈 가져옴
const app = express()
//express를 이용 app생성
const port = 5000
console.log("port connect");

const config = require("./config/key");

const {User} = require("./models/User");

//application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//application/json
app.use(express.json());


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connencted...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!  헬로월드 !@#!@#!@#')
})


app.post('/register', (req, res) => {

  //회원 가입 할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어둔다.
    const user = new User(req.body)

    user.save((err, userInfo) => {
      if (err) return res.json({success: false, err})
      return res.status(200).json({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}!`)
})

