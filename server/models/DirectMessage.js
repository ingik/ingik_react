const mongoose = require('mongoose');

const directMessageSchema = mongoose.Schema({

    sendUserId:{
        type:String
    },
    receiveUserId:{
        type:String
    },
    chatList:{
        type:Array,
        chatSendId:{
            type:String
        },
        chatContent:{
            type:String
        },
        SendDate:{
            type:Date,
            // default:Date.now
        },
    }
  
});

const DirectM = mongoose.model('DirectM', directMessageSchema)
module.exports = { DirectM } 