const express = require('express');
const app = express()
const port = 5000
console.log("port connect");

const mongoose = require('mongoose');

//model
const { User } = require("./models/User");
const { Board } = require('./models/Board');
const { Chat } = require('./models/Chat')
const { Room } = require('./models/Room') 
const { ImageBoard } = require('./models/ImageBoard')
const { Comment } = require('./models/Comment')
const { Follow } = require('./models/Follow')
const { Recommand } = require('./models/Recommand')
const { Follower } = require('./models/Follower')
const { DirectM } = require('./models/DirectMessage')


//middleware
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const config = require("./config/key");
const { auth } = require("./middleware/auth");
const  upload  = require('./S3/upload');
const S3BoardUpload = require('./S3/S3BoardUpload')
const imageDelete = require('./S3/imageDelete')


//application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//application/json
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser());

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


    User.findOne({email : req.body.email },(err,userEmail) => {
      if(!userEmail) {
        User.findOne({name : req.body.name},(err,userName) => {
          if(!userName){
            user.save((err) => {
              if (err) return res.json({success: false, err})
              // return res.status(200).json({ success: true })

              const follow = new Follow()
              follow.followerId = user._id

              const follower = new Follower()
              follower.UserId = user._id

              follow.save((err) => {
                if(err) return res.json({success: false, err})
                // res.status(200).json({ success: true })
              })

              follower.save((err) => {
                if(err) return res.json({success: false, err})
                return res.status(200).json({ success: true })
              })

              

            })
          } else if(err) {
            return res.status(500).send({error:'namecheck failed'})
          } else if(user) return res.json({namecheck:false})
        })
      } else if(err){
        return res.status(500).send({error:'emailcheck failed'})
      }else if(user) return res.json({emailcheck:false})


      
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
    image: req.user.image,
    intro: req.user.intro
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

app.get('/api/users/findId/:key',(req,res) => {
  console.log(req.params.key)
  User.findOne({_id : req.params.key },(err,user) => {
    if(err) return res.json({ findUser:false, err })
    return res.json(user)
  })
})

//User ImageUpdate
app.post('/api/users/imageUpdate', upload.array('imageData'),(req,res,err) => {
  
  console.log('imagefiles[0] : '+ JSON.stringify(req.files[0]))
  console.log('req.body.stringImage  : '+req.body.stringImage )

  imageDelete(req.body.stringImage)

  if(!req.files[0]) return res.json('no image')
  return res.json(req.files[0])

})

//User ProfileUpdate
app.post('/api/users/profileUpdate', auth , (req,res) => {

  
  const user = new User(req.body)
  let imageUrl = req.body.updateImage
  user.image = imageUrl

  console.log(req.body)

  if(req.body.emailBefore !== req.body.email && req.body.nameBefore === req.body.name ){

    User.findOne({email : req.body.email },(err,userEmail) => {
      if(err) return res.json({ check:false, err })
      if(!userEmail) {
        User.findOneAndUpdate({_id : req.user._id ,name : req.user.name},
          {$set: {'email':user.email,'intro':user.intro }},
        (err,user) => {
      
          if(err) return res.status(500).send({ error: 'profileUpdate failure'})
          return res.status(200).json({success:true})
        })
      }
      if(userEmail) return res.json({emailcheck:false})
    })

  } else if( req.body.emailBefore === req.body.email && req.body.nameBefore !== req.body.name ){

    User.findOne({ name: req.body.name }, (err, userName) => {
      if (!userName) {

        if(req.body.image !== req.body.imageBefore){

          User.findOneAndUpdate({_id : req.user._id},
            {$set: { 'image':user.image }},
          (err,user) => {
        
            if(err) return res.status(500).send({ error: 'profileUpdate failure'})
          })
    
        }
        
        User.findOneAndUpdate({_id : req.user._id ,name : req.user.name},
          {$set: { 'name':user.name ,'intro':user.intro}},
        (err,user) => {
      
          if(err) return res.status(500).send({ error: 'profileUpdate failure'})
          return res.status(200).json({success:true})
        })
      }
      if(err) return res.json({ check:false, err })
      if(userName) return res.json({ namecheck: false });
      
    });

  } else if(req.body.emailBefore !== req.body.email && req.body.nameBefore !== req.body.name){

    User.findOne({email : req.body.email },(err,userEmail) => {
      if(!userEmail) {

        User.findOne({name : req.body.name },(err,userName) => {
          if(!userName) {

            if(req.body.image !== req.body.imageBefore){

              User.findOneAndUpdate({_id : req.user._id},
                {$set: { 'image':user.image }},
              (err,user) => {
            
                if(err) return res.status(500).send({ error: 'profileUpdate failure'})
              })
        
            }

            User.findOneAndUpdate({_id : req.user._id ,name : req.user.name},
              {$set: { 'name':user.name , 'email':user.email,'intro':user.intro }},
            (err,user) => {
          
              if(err) return res.status(500).send({ error: 'profileUpdate failure'})
              return res.status(200).json({success:true})
            })

          }
          if(err) return res.json({ check:false, err })
          if(userName) return res.json({namecheck:false})
        })

      }
      if(err) return res.json({ check:false, err })
      if(userEmail) return res.json({emailcheck:false})
    })

  } else {

    if(req.body.image !== req.body.imageBefore){

      User.findOneAndUpdate({_id : req.user._id},
        {$set: { 'image':user.image }},
      (err,user) => {
    
        if(err) return res.status(500).send({ error: 'profileUpdate failure'})
      })

    }

    User.findOneAndUpdate({_id : req.user._id ,name : req.user.name},
      {$set: { 'name':user.name , 'email':user.email,'intro':user.intro }},
    (err,user) => {
  
      if(err) return res.status(500).send({ error: 'profileUpdate failure'})
      return res.status(200).json({success:true})
    })

    

  }

  


  


})

//User list
app.post('/api/users/list',(req,res) => {
  User.find({$or:[{name:{$regex : req.body.name}},{intro:{$regex: req.body.name}}]},(err,user) => {
    console.log(user)
    if(err) return res.status(500).send({error: 'database failure'})
    return res.status(200).json(user)
  })
})

//Following
app.post('/api/users/following',(req,res) => {
  
  Follow.findOneAndUpdate(
    { followerId : req.body.followerId },
    {
      $push: {
        following: {
          followingId: req.body.followingId,
        },
      },
    },
    (err, follow) => {
      // if (err) return res.status(500).send({ error: "Following failure" });
      console.log(follow)

      Follower.findOneAndUpdate(
        { UserId : req.body.followingId},
        {
          $push: {
            Myfollowing: {
              MyfollowingId: req.body.followerId,
            },
          },
        },
        (err, follower) => {
          if (err) return res.status(500).send({ error: "Follower failure" });
          return res.status(200).send(follower);
        }
      );
    }
  )

  

})

//UnFollowing
app.post('/api/users/unfollowing',(req,res) => {
  Follow.findOneAndUpdate(
    { followerId : req.body.followerId },
    {
      $pull: {
        following: {
          followingId: req.body.followingId,
        },
      },
    },
    (err, follow) => {
      // if (err) return res.status(500).send({ error: "UnFollowing failure" });
      // return res.status(200).send(follow);
      console.log(follow)
      Follower.findOneAndUpdate(
        { UserId : req.body.followingId },
        {
          $pull: {
            Myfollowing: {
              MyfollowingId: req.body.followerId,
            },
          },
        },
        (err, follower) => {
          if (err) return res.status(500).send({ error: "UnFollower failure" });
          return res.status(200).send(follower);
        }
      )
    }
  )

})

//FollowCheck
app.post('/api/users/followCheck',(req,res) => {
  console.log('followCheck'+req.body.followerId)
  console.log('followCheck'+req.body.followingId)

  Follow.findOne(
        { followerId: req.body.followerId , following: { followingId: req.body.followingId }},
    (err, follow) => {
      if (err) return res.status(500).send({ error: "followCheck failure" });
      return res.status(200).send(follow)
    }
  );
})

//FollowLength

app.get('/api/users/followLength/:key',(req,res) => {
  Follow.find({followerId:req.params.key},(err,follow) => {
    if(err) return res.status(500).send({ error: "followLength failure"})
    return res.status(200).send(follow)
  })
})

//FollowerLength

app.get('/api/users/followerLength/:key',(req,res) => {
  Follower.find({UserId:req.params.key},(err,follower) => {
    if(err) return res.status(500).send({ error: "followLength failure"})
    return res.status(200).send(follower)
  })
})

//recommand

app.post('/api/boards/recommand',(req,res) => {
  
  Recommand.findOneAndUpdate(
    { boardId : req.body.boardId },
    {
      $push: {
        recommand: {
          recommandId: req.body.recommandId,
        },
      },
    },
    (err, recommand) => {
      if (err) return res.status(500).send({ error: "recommand failure" });
      return res.status(200).send(recommand);
    }
  );

})

//unrecommand
app.post('/api/boards/unrecommand',(req,res) => {

  Recommand.findOneAndUpdate(
    { boardId : req.body.boardId },
    {
      $pull: {
        recommand: {
          recommandId: req.body.recommandId,
        },
      },
    },
    (err, recommand) => {
      if (err) return res.status(500).send({ error: "Unrecommand failure" });
      return res.status(200).send(recommand);
    }
  )
})

//recommandCheck
app.post('/api/boards/recommandCheck',(req,res) => {
  console.log('recommandCheck'+req.body.boardId)
  console.log('recommandCheck'+req.body.recommandId)

  Recommand.findOne(
        { boardId: req.body.boardId , recommand: { recommandId: req.body.recommandId }},
    (err, recommand) => {
      if (err) return res.status(500).send({ error: "recommandCheck failure" });
      return res.status(200).send(recommand)
    }
  );
})

//recommandLength

app.get('/api/boards/recommandLength/:key',(req,res) => {
  Recommand.find({boardId:req.params.key},(err,recommand) =>{
    if (err) return res.status(500).send({ err: "recommandLength failure"})
    return res.status(200).send(recommand)
  })
})



//ImageBoardUpload
app.post('/api/boards/imageBoardUpload', S3BoardUpload.array("ImageArr"),(req,res,next) => {

  console.log('ImageArr : '+ req.files)
  console.log('string ' + req.body.userName)

  if(!req.files[0]) return console.log('no files')
  return res.json(req.files)
})

//ImageBoardCreate
app.post('/api/boards/imageBoardCreate',(req,res) => {

  const image = new ImageBoard(req.body)
  image.createAt = Time
  image.viewCount
  image.recommand

  image.save(async(err,board) => {
    if(err) return res.json({success: false, err})
    console.log('board._id : '+board._id)
    await get(board._id)
  })
  

  function get(AsyncData){
    console.log("Create Comment");

    const comment = new Comment();

    comment.boardId = AsyncData;
    comment.save((err) => {
      if (err) return res.json({ success: false, err });
    });

    const recommand = new Recommand();

    recommand.boardId = AsyncData;
    recommand.save((err) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true });
    });

    
  }

})

//imageBoardList

app.get('/api/boards/imageBoardList', auth ,(req,res) => {

  ImageBoard.find((err,imageBoard) => {
    if(err) return res.status(500).send({error: 'database failure'})
    return res.status(200).json(imageBoard)
  }).sort({_id:-1}).limit(15)

})

app.get('/api/boards/imageBoardList/:key',(req,res) => {

  let index = req.params.key * 15
  console.log(index)
  ImageBoard.find((err,imageBoard) => {
    if(err) return res.status(500).send({error: 'database failure'})
    return res.status(200).json(imageBoard)
  }).sort({_id:-1}).skip(index).limit(15)

})

app.get('/api/boards/imageBoard/:key',(req,res) => {

  ImageBoard.find({ '_id': req.params.key },(err,board) => {
    if(err) return res.status(500).send({error: 'database failure'})
    return res.status(200).json(board)
  })

})

//profileList

app.get('/api/boards/imageBoard/profileList/:key',(req,res) => {

  ImageBoard.find({ 'user': req.params.key },(err,board) => {
    if(err) return res.status(500).send({error: 'database failure'})
    return res.status(200).json(board)
  })

})

app.get('/api/boards/imageBoard/profileList/:key/:num',(req,res) => {

  let index = req.params.num * 15
  console.log(index)
  ImageBoard.find({ 'user': req.params.key },(err,board) => {
    if(err) return res.status(500).send({error: 'database failure'})
    return res.status(200).json(board)
  }).sort({_id:-1}).skip(index).limit(15)
})

//imageBoardDelete
app.delete('/api/boards/imageBoard/delete/:key/:auth',auth,(req,res)=>{


  console.log(req.user._id)
  console.log(req.params.auth)

  if (req.user._id == req.params.auth) {
    ImageBoard.findOneAndDelete({ _id: req.params.key }, (err, board) => {
      console.log("Ib delete");
      if (err)
        return res.status(500).send({ error: "imageBoard delete failure" });
      return res.status(200).json(board);
    });

    Comment.findOneAndDelete({ boardId: req.params.key }, (err, comment) => {
      console.log("cm delete");
      if (err)
        return res
          .status(500)
          .send({ error: "imageboard delete Comment failure" });
    });

    Recommand.findOneAndDelete(
      { boardId: req.params.key },
      (err, recommand) => {
        console.log("rc delete");
        if (err)
          return res
            .status(500)
            .send({ error: "imageBoard delete Recommand failure" });
      }
    );
  }

})


//imageboardcommentCreate

app.post('/api/boards/imageBoardComment',(req,res) => {

  Comment.findOne({ 'boardId' : req.body.boardId  },(err,comment) => {

    if (!comment) {
      createFunc();
    } else {
      updateFunc();
    }
  })

  function createFunc(){
      console.log('Create Comment')
      const comment = new Comment(req.body)
      comment.save((err) => {
      if (err) return res.json({success: false, err})
      return res.status(200).json({ success: true })
      })
    }

  function updateFunc(){
    console.log('Update Comment')
    console.log(req.body)
      Comment.updateOne(
        { boardId: req.body.boardId },
        {
          $push: {
            commentList: {
              userId: req.body.commentList.userId,
              content: req.body.commentList.content,
            },
          },
        },
        (err, comment) => {
          if (err) return res.status(500).send({ error: "database failure" });
          return res.status(200).send(comment);
        }
      );
      }
})


//imageBoardCommentList

const async = require('async');
app.get('/api/baords/imageBoard/comment/:key',(req,res) => {

  console.log('imageBoardCommentList')
  Comment.find({ 'boardId': req.params.key },(err,comment) => {
    if(err) return res.status(500).send({error: 'database failure'})
    
    console.log(comment[0].commentList)
    // if(!comment){
    List = comment[0].commentList
    console.log(List)
    
    ListArray = []
    List.slice(0).reverse().map((item,index) => {
      ListArray.push(ArrayFunc(item))
    })

    function ArrayFunc(data){
      console.log('ArrayFunc')
      return function(callback){
        User.findOne({_id : data.userId },(err,user) => {
          if(err) return res.json({ check:false, err })
          
          let body = {
            user:user,
            content:data.content
          }

          callback(null,body)
        })

      }
    }

    async.series(ListArray, function(err, result){
      console.log(result)
      if(err) return console.log('async error')
      res.send(result)
    })
    // }

  }).sort({"index":-1})
  
  
})

//imageBoardCommentDelelte

app.delete('/api/boards/imageBoard/comment/delete/:boardId/:userId/:content',(req,res) => {

  console.log(req.params.boardId)
  console.log(req.params.userId)
  console.log(req.params.content)

  Comment.updateOne(
    { boardId: req.params.boardId},
    {
      $pull: {
        commentList: {
          userId: req.params.userId,
          content: req.params.content,
        },
      },
    },
    (err, comment) => {
      if (err) return res.status(500).send({ error: "database failure" });
      return res.status(200).send(comment);
    }
  );
  
  
})

//CommentLength 

app.get('/api/boards/commentLength/:key',(req,res) => {
  Comment.find({boardId:req.params.key},(err,comment) =>{
    if (err) return res.status(500).send({ err: "commentLength failure"})
    return res.status(200).send(comment)
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

  Board.findOneAndUpdate(
    { _id: req.params.key, username: req.user.name },
    { $set: { title: board.title, content: board.content } },
    (err, board) => {
      if (err) return res.status(500).send({ error: "database failure" });
      return res.status(200).send(board);
    }
  );
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


//DM Create

app.post('/api/DirectMessage/Create',(req,res) => {
  

  // DirectM.find({$or:[{sendUserId: req.body.receiveUserId},{receiveUserId: req.body.receiveUserId}]},(err,dm) => {
  DirectM.find({$or:[{sendUserId: req.body.receiveUserId,receiveUserId: req.body.sendUserId},
    {sendUserId: req.body.sendUserId, receiveUserId: req.body.receiveUserId}]},(err,dm) => {
    if(err) return res.status(500).send({error :'DM error'})
    if(dm.length !== 0 ){
      return res.status(200).send(dm)
    }
    const DirectMessage = new DirectM(req.body)
  
    // console.log('DirectMessage : '+DirectMessage)
    DirectMessage.save((err) => {
      if(err) return res.status(500).send({success:false,err})
      return res.status(200).send({ success:'DM Create' })
    })
  })

})

//DMUserList

app.get('/api/DirectMessage/List/:key',(req,res) => {

  console.log(req.params.key)
  DirectM.find({$or:[{sendUserId: req.params.key},{receiveUserId: req.params.key}]},(err,list) => {
    if(err) return res.status(500).send({success:false,err})
    return res.status(200).send(list)
  })

})

//Chatting List

app.get('/api/DirectMessage/chatList/',(req,res) => {
  console.log(req.query)
  DirectM.find({$or:[{sendUserId: req.query.user ,receiveUserId: req.query.other},
    {sendUserId: req.query.other, receiveUserId: req.query.user}]},(err,dm) => {
    if(err) return res.status(500).send({error :'DM error'})
    return res.status(200).send(dm)
  })
})

//Chatting Input 

app.post('/api/DirectMessage/input/',(req,res) => {
  
  DirectM.findOneAndUpdate()
  
})


//Chat


const Server = require('socket.io');
const { time } = require('console');

const server = require('http').Server(app);
// const io = Server(server,{
//   cors: {
//     origin: "*",
//     methods:["GET","POST"],
// }
// });

const io = Server(server,{
  cors: {
    origin: "*",
    methods:["GET","POST"],
}
});



//Chat Server
const serverPort = 5555

io.on('connection', (socket) => {


  io.to(socket.id).emit('my socket id',{socketId: socket.id});
  console.log("연결된 socketID : ", socket.id);

  socket.on('joinRoom',(roomName) => {
    console.log('roomName : '+roomName)
    socket.join(roomName)

    io.to(roomName).emit('room Info',roomName)

    socket.on('enter chatroom', (data) => {
        console.log(data + " 님 입장");
        io.to(roomName).emit('client login', {type:data+" 님 입장", regDate:Time,socketId:socket.id});
    })

    socket.on('send message',(data) => {
        console.log("(back)send message : "+ JSON.stringify(data))
        DirectM.findOneAndUpdate(
          { _id : data._id},
          {
          $push: {
            chatList: {
              chatSendId: data.chatSendId,
              chatContent: data.chatContent,
              SendDate: Time
            },
          },
        },
        (err, dm) => {
          if (err) io.to(roomName).emit('all message', err)
          io.to(roomName).emit('all message', data)
          // return res.status(200).send(dm);
        }
      )
        
    })

    socket.on('disconnect', () => {
      console.log('누가 나감');
      io.to(roomName).emit('disconnected', {type:'퇴장'});
      // socket.emit('disconnected', {type:'퇴장'});
    })

    
  })
})

  


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

  console.log('(server)roomName : ' + req.body.roomName)
  
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

