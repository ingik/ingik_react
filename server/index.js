const express = require('express');
//express 모듈 가져옴
const app = express()
//express를 이용 app생성
const port = 5000
console.log("port connect");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const config = require("./config/key");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

//application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//application/json
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser());


const mongoose = require('mongoose');
const { request } = require('express');
const { Board } = require('./models/Board');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connencted...'))
.catch(err => console.log(err))


app.post('/api/users/register', (req, res) => {

  //회원 가입 할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어둔다.
    const user = new User(req.body)

    user.save((err, userInfo) => {
      if (err) return res.json({success: false, err})
      return res.status(200).json({
        success: true
      })
    })
})

app.post('/api/users/login',(req, res) => {

  console.log('email : '+req.body.email)

  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email },(err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    

    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if(!isMatch)
      
        return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})

      //비밀번호까지 맞다면 토큰을 생성
      
      user.generateToken((err,user) => {
        if(err) return res.status(400).send(err);

        // 토큰을 저장한다. 쿠키 or 로컬스토리지 등등..
        res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess: true, userId: user._id})
      
      })
    })
  }) 
})

app.get('/api/users/auth', auth , (req, res) => {

  //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true라는 말.
  return res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.roll === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role : req.user.role,
    image: req.user.image
  })


})

app.get('/api/users/logout', auth , (req, res) => {

  //미들웨어(auth)에서 user를 가지고옴 
  User.findOneAndUpdate({_id: req.user._id}, 
    { token: "" }
    , (err , user) => {
      if(err) return res.json({success: false , err})
      return res.status(200).send({ 
        success: true 
      })
  })
})

//boardCreate

app.post('/api/boards/create', auth ,(req, res) => {
  const board = new Board(req.body)
  board.username = req.user.name
  board.save((err) =>{
    if (err) return res.json({success: false, err})
    return res.status(200).json({ 
      success: true 
    })
  })
})



//boardlist

app.get('/api/boards/list',(req,res) => {
  Board.find((err,board) => {
    if(err) return res.status(500).send({error: 'database failure'})
    return res.status(200).json(board)
  })
})


//boardDetail

app.get('/api/boards/detail/:key', auth ,(req,res) => {
  
  console.log('board ID : ' + JSON.stringify(req.params.key));
  console.log('username : ' + req.user.name)


  Board.find({ '_id': req.params.key },(err,board) => {
    if(err) return res.status(500).send({error: 'database failure'})
    return res.status(200).json(board)
  })
})


//boardUpdata

app.post('/api/boards/detail/:key/update', auth ,(req,res) => {

  console.log('board ID : ' + JSON.stringify(req.params.key))
  console.log('username : ' + req.user.name)

  const board = new Board(req.body)
  board.username = req.user.name

  console.log('board Title : '+ board.title)

  Board.findOneAndUpdate({_id : req.params.key , username : req.user.name },{$set: { 'title':board.title , 'content':board.content }},
    (err,board) => { 

      if(err) return res.status(500).send({ error: 'database failure'})
      return res.status(200).send(board)
  })
})

//boardDelete

app.delete('/api/boards/detail/:key', auth ,(req,res) => {

  console.log('board ID : ' + JSON.stringify(req.params.key))
  console.log('username : ' + req.user.name)

  Board.remove({_id : req.params.key , username : req.user.name },
    (err,board) => { 

      console.log(Board.username)
      console.log(req.user.name)
      if(err) return res.status(500).send({ error: 'database failure'})
      return res.status(200).send(board)
  })

}) 




app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}!`)
})

/*
  app.listen

  app.listen = function() {
    var server = http.createServer(this);
    return server.listen.apply(server, arguments);
  };
*/

