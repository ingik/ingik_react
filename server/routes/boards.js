const router = require("express").Router();


//model
const { User } = require("../models/User");
const { ImageBoard } = require('../models/ImageBoard')
const { Comment } = require('../models/Comment')
const { Recommand } = require('../models/Recommand')
const { Notice } = require('../models/Notice')


//middleware
const { auth } = require("../middleware/auth");
const S3BoardUpload = require('../S3/S3BoardUpload')

//recommand
router.post('/recommand',(req,res) => {
  
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
        // return res.status(200).send(recommand);
      }
    );
  
    //추가중..
    Notice.findOne(
      {userId: req.body.boardUserId},
      {
          noticeList:{
            sendUserId:req.body.recommandId,
          },
      },(err, notice) => {
        console.log(!notice.noticeList.length)
        if (err) return res.status(500).send({error: "notice find error"})
        if(notice.noticeList.length == 0) {
          Notice.findOneAndUpdate(
            {userId: req.body.boardUserId},
            {
              $push: {
                noticeList:{
                  sendUserId:req.body.recommandId,
                  boardId:req.body.boardId,
                  type:1
                },
              },
            },(err,noticeUpdate) => {
              if (err) return res.status(500).send({ error: "notice rec failure" })
              return res.status(200).send(noticeUpdate)
            }
          )
        }else{
          return res.json({message : 'already notice data'})
        }
      }
  
    )
    
  })
  
  //unrecommand
  router.post('/unrecommand',(req,res) => {
  
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
  router.post('/recommandCheck',(req,res) => {
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
  router.get('/recommandLength/:key',(req,res) => {
    Recommand.find({boardId:req.params.key},(err,recommand) =>{
      if (err) return res.status(500).send({ err: "recommandLength failure"})
      return res.status(200).send(recommand)
    })
  })
  
  //ImageBoardUpload
  router.post('/imageBoardUpload', S3BoardUpload.array("ImageArr"),(req,res,next) => {
  
    console.log('ImageArr : '+ req.files)
    console.log('string ' + req.body.userName)
  
    if(!req.files[0]) return console.log('no files')
    return res.json(req.files)
  })
  
  //ImageBoardCreate
  router.post('/imageBoardCreate',(req,res) => {
  
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
  
  router.get('/imageBoardList', auth ,(req,res) => {
  
    ImageBoard.find((err,imageBoard) => {
      if(err) return res.status(500).send({error: 'database failure'})
      return res.status(200).json(imageBoard)
    }).sort({_id:-1}).limit(18)
  
  })
  
  router.get('/imageBoardList/:key',(req,res) => {
  
    let index = req.params.key * 18
    console.log(index)
    ImageBoard.find((err,imageBoard) => {
      if(err) return res.status(500).send({error: 'database failure'})
      return res.status(200).json(imageBoard)
    }).sort({_id:-1}).skip(index).limit(18)
  
  })
  
  
  //imageBoardListCmp
  
  router.get('/imageBoardListCmp', auth ,(req,res) => {
  
    ImageBoard.find((err,imageBoard) => {
      if(err) return res.status(500).send({error: 'database failure'})
      return res.status(200).json(imageBoard)
    }).sort({_id:-1}).limit(3)
  
  })
  
  router.get('/imageBoardListCmp/:key',(req,res) => {
  
    let index = req.params.key * 3
  
    console.log(index)
    ImageBoard.find((err,imageBoard) => {
      if(err) return res.status(500).send({error: 'database failure'})
      return res.status(200).json(imageBoard)
    }).sort({_id:-1}).skip(index).limit(3)
  
  })
  
  router.get('/imageBoard/:key',(req,res) => {
  
    ImageBoard.find({ '_id': req.params.key },(err,board) => {
      if(err) return res.status(500).send({error: 'database failure'})
      return res.status(200).json(board)
    })
  
  })
  
  //profileList
  router.get('/imageBoard/profileList/:key',(req,res) => {
  
    ImageBoard.find({ 'user': req.params.key },(err,board) => {
      if(err) return res.status(500).send({error: 'database failure'})
      return res.status(200).json(board)
    }).sort({_id:-1}).limit(15)
  
  })
  
  router.get('/imageBoard/profileList/:key/:num',(req,res) => {
  
    
    let index = req.params.num * 15
    console.log(index)
    ImageBoard.find({ 'user': req.params.key },(err,board) => {
      if(err) return res.status(500).send({error: 'database failure'})
      return res.status(200).json(board)
    }).sort({_id:-1}).skip(index).limit(15)
  })
  
  //imageBoardDelete
  router.delete('/imageBoard/delete/:key/:auth',auth,(req,res)=>{
  
  
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
  router.post('/imageBoardComment',(req,res) => {
  
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
  router.get('/imageBoard/comment/:key',(req,res) => {
  
    console.log('imageBoardCommentList')
    Comment.find({ 'boardId': req.params.key },{boardId:0,_id:0,__v:0},(err,comment) => {
      if(err) return res.status(500).send({error: 'database failure'})
      
      List = comment[0].commentList
      console.log('comment : '+comment)
      
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
  
    }).sort({"index":-1}).limit(5)
    
    
  })
  
  
  //test
  router.get('/imageBoard/comment/test/:key/',(req,res) => {
  
    Comment.find({ 'boardId': req.params.key},(err,comment) => {
      if (err) return res.status(500).send({ err: "test failure"})
      return res.status(200).send(comment)
    }).limit(5)
  
  })
  
  //imageBoardCommentDelelte
  router.delete('/imageBoard/comment/delete/:boardId/:userId/:content',(req,res) => {
  
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
  router.get('/commentLength/:key',(req,res) => {
    Comment.find({boardId:req.params.key},(err,comment) =>{
      if (err) return res.status(500).send({ err: "commentLength failure"})
      return res.status(200).send(comment)
    })
  })
  
  


module.exports = router;
