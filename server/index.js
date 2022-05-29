const express = require('express');
const app = express()
const port = 5000
console.log("port connect");

const mongoose = require('mongoose');

//model
const { Chat } = require('./models/Chat')
const { Room } = require('./models/Room') 
const { DirectM } = require('./models/DirectMessage')


//middleware
const cookieParser = require('cookie-parser');
const config = require("./config/key");
const { auth } = require("./middleware/auth");


//application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));


//application/json
app.use(express.json({
  limit : "50mb"
}));
app.use(cookieParser());


//DB connect
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

//route
const userRouter = require('./routes/users')
app.use('/api/users', userRouter)

const boardRouter = require('./routes/boards')
app.use('/api/boards', boardRouter)

const chatRouter = require('./routes/chat')
app.use('/api', chatRouter)






//Chat
const Server = require('socket.io');
const server = require('http').Server(app);

const io = Server(server,{
  cors: {
    origin: "*",
    methods:["GET","POST"],
}
});


//Chat Server
const serverPort = 5555

let roomTest

io.on('connection', (socket) => {
  
  io.to(socket.id).emit('my socket id',{socketId: socket.id});
  console.log("연결된 socketID : ", socket.id);

  //join room
  
  socket.on('joinRoom',(roomName) => {
    
    socket.join(roomName)
    console.log(socket.rooms);
    console.log('roomName : '+roomName)
    
    roomTest = roomName
  })
  
  console.log('roomTest : '+roomTest)
  
  socket.on('enter chatroom', (data) => {
    console.log(socket.rooms);
    console.log(data.name + " 님 입장");
    io.to(data.room).emit('client login', {type:data.name+" 님 입장", regDate:Time,socketId:socket.id});
  })


  //room send maessage

  socket.on("send message", (data) => {
    console.log("(back)send message : " + JSON.stringify(data));
    DirectM.findOneAndUpdate(
      { _id: data._id },
      {
        $push: {
          chatList: {
            chatSendId: data.chatSendId,
            chatContent: data.chatContent,
            SendDate: Time,
          },
        },
      },
      (err, dm) => {
        if (err) io.to(data.room).emit("all message", err);
        io.to(data.room).emit("all message", data);
        // return res.status(200).send(dm);
      }
    );
  });

  //room leave

  socket.on('leave chatroom',(data) => {
    socket.leave(data)
    io.to(data).emit('leave alert',{type:'방을 나가셨습니다.'})
  })


  //socket disconnect

  socket.on('disconnect', () => {
    console.log('disconnect socket');
    // io.to(roomName).emit('disconnected', {type:'로그아웃'});
    socket.emit('disconnected', {type:'socket disconnect'})
  })

})

  


//port connect
app.listen(port, () => {
  console.log(`app listening on port localhost:${port}!`)
})

server.listen(serverPort, () => {
  console.log(`chat_server listening on port lacalhost:${serverPort}!`)
})

