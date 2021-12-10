const mongoose = require('mongoose');


const chatSchema = mongoose.Schema({

    socketId:{
        type:String
    },
    roomId:{
        type:String,
    },
    sendAt:{
        type:Date,
    },
    regDate:{
        type:Date,
    },
    
    
})

const Chat = mongoose.model('Chat', chatSchema)
module.exports = { Chat } 