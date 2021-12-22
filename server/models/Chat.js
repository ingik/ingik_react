const mongoose = require('mongoose');


const chatSchema = mongoose.Schema({

    index:{
        type: String
    },
    socketId:{
        type:String
    },
    roomId:{
        type:String
    },
    username:{
        type:String
    },
    sendAt:{
        type:Date
    },
    regDate:{
        type:Date
    },
})

const Chat = mongoose.model('Chat', chatSchema)
module.exports = { Chat } 