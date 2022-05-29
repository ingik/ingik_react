const router = require("express").Router();

const { DirectM } = require('../models/DirectMessage')


//DM Create
router.post('/DirectMessage/Create',(req,res) => {
  
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
  
  router.get('/DirectMessage/List/:key',(req,res) => {
  
    console.log(req.params.key)
    DirectM.find({$or:[{sendUserId: req.params.key},{receiveUserId: req.params.key}]},(err,list) => {
      if(err) return res.status(500).send({success:false,err})
      return res.status(200).send(list)
    })
  
  })
  
  //Chatting List
  
  router.get('/DirectMessage/chatList/',(req,res) => {
    console.log(req.query)
    DirectM.find({$or:[{sendUserId: req.query.user ,receiveUserId: req.query.other},
      {sendUserId: req.query.other, receiveUserId: req.query.user}]},(err,dm) => {
      if(err) return res.status(500).send({error :'DM error'})
      return res.status(200).send(dm)
    })
  })

module.exports = router;
