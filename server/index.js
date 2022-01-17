const express = require('express');
const app = express()
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
const { Chat } = require('./models/Chat')
const { Room } = require('./models/Room') 


mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connencted...'))
.catch(err => console.log(err))


//Time setting

const moment = require('moment');
require('moment-timezone');

moment.tz.setDefault("Asia/Seoul");
console.log(moment().format('YYYY-MM-DD HH:mm:ss'));

let Time = moment().format('YYYY-MM-DD HH:mm:ss')



//User Register

app.post('/api/users/register', (req, res) => {

    const user = new User(req.body)


    user.find
    user.findOne({email : req.body.email },(err,user) => {
      if(err) return res.json({ emailcheck :false })

      user.findOne({name : req.body.name},(err,user) => {
        if(err) return res.json({ namecheck :false })
        
        user.save((err, userInfo) => {
          if (err) return res.json({success: false, err})
          return res.status(200).json({
            success: true
          })
        })


      })
      
    })



})

//User Login

app.post('/api/users/login',(req, res) => {

  console.log('email : '+req.body.email)

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


//User auth

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

//User Logout

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

//User Find

app.post('/api/users/find',(req,res) => {
  console.log('userCHeck'+JSON.stringify(req.body))
  User.findOne({name : req.body.username },(err,user) => {
    if(err) return res.json({ check:false, err })
    return res.json(user)
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


//Chat


const Server = require('socket.io');
const { time } = require('console');

const server = require('http').Server(app);
const io = Server(server,{
  cors: {
    origin: ["http://localhost:3000"],
    methods:["GET","POST"],
}
});

//ChatDatile(Room init setting)

// let chatUser
// let roomName
// console.log('(server)RoomName : '+roomName)
// console.log('(server) : '+chatUser)

// app.post('/api/chat/detail',auth,(req,res) => {
//   roomName = req.body.roomName
//   console.log('(server)RoomName : '+roomName)
//   chatUser = req.user.name
//   console.log('(server) : '+chatUser)
// })

//Chat Server
const serverPort = 5555

io.on('connection', (socket,roomName,chatUser) => {


  io.to(socket.id).emit('my socket id',{socketId: socket.id});
  console.log("연결된 socketID : ", socket.id);

  socket.on('joinRoom',(roomName) => {

    socket.join(roomName)

    io.to(roomName).emit('room Info',roomName)

    socket.on('enter chatroom', () => {
        console.log("누가 들어옴");
        io.to(roomName).emit('client login', {type: "alert", chat: "누군가 들어왔다구", regDate:Time,socketId:socket.id});
    })

    socket.on('send message',(data) => {
        console.log("(back)send message : "+ JSON.stringify(data))

        const chat = new Chat()
        chat.message = data.message
        chat.roomName = data.roomName
        chat.username = data.userName
        chat.socketId = socket.id
        chat.regData = Time
        console.log('(server.socket)chat : '+chat)
        chat.save()
        io.to(roomName).emit('all message', chat)
        
    })

    socket.on('disconnect', () => {
      console.log('누가 나감');
      io.to(roomName).emit('disconnected', {type: "alert", chat: "누군가 나갔다구", regDate:Time});
    })

  })
})

//disconnet 소켓아웃 leave는 룸아웃 연결은 계속 유지 시켜놓고 방 나가기를 leave로만 구현 해주면 실시간 채팅이 되지 않을까
//chatDetail redux는 지금 당장 사용하지 않고있다.
    

  

  


//CreateChat

app.post('/api/chat/create',(req,res) =>{

  const room = new Room(req.body)
  room.roomName = req.body.roomName
  room.save((err) =>{
    if (err) return res.json({success: false, err})
    return res.status(200).json({ 
      success: true 
    })
  })
})

//ChatList

app.get('/api/chat/list', auth ,(req,res) => {
  Room.find((err,room) => {
    if(err) return res.status(500).send({error: 'database failure'})
    return res.status(200).json(room)
    
  })
})

//ChatRefresh

app.post('/api/chat/refresh',(req,res) => {

  console.log('(server)roomName : '+req.body.roomName)
  
  Chat.find({roomName : req.body.roomName},(err,chat) => {
    if(err) return res.status(500).send({error: 'refresh failure' })
    return res.status(200).json(chat)
  })
})


//SendMessage

app.post('/api/chat/detail/sendMessage',(req,res) => {

  const chat = new Chat()

})






//port connect
app.listen(port, () => {
  console.log(`app listening on port localhost:${port}!`)
})

server.listen(serverPort, () => {
  console.log(`chat_server listening on port lacalhost:${serverPort}!`)
})



/*
  app.listen

  app.listen = function() {
    var server = http.createServer(this);
    return server.listen.apply(server, arguments);
  };
*/



