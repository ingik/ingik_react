const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({

    userId:{
        type:String
    },
    sendUserId:{
        type:String
    },
    noticeDate:{
        type:Data,
        default:Date.now
    },
    noticeCheck:{
        type:Boolean,
        defalut:false
    },
})

const Notice = mongoose.model('Notice', noticeSchema)
module.exports = { Notice } 