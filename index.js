const express = require('express')
//express 모듈 가져옴
const app = express()
//express를 이용 app생성
const port = 4000;

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ingik:asdf1234@ingik.ztvnt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connencted...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}!`)
})

