const mongoose = require('mongoose');
const { array } = require('../S3/upload');
const moment = require('moment');

const noticeSchema = mongoose.Schema({

    userId:{
        type:String
    },
    noticeList:{
        type:Array,
        sendUserId:{
            type:String
        },
        noticeDate:{
            type:Date
        },
        noticeCheck:{
            type:Boolean,
            defalut:false
        },
        boardId:{
            type:String
        },
        RecommandId:{
            type:String
        },
        followId:{
            type:String
        },
        commentId:{
            type:String
        },
        type:{
            //1 : Recommand
            //2 : comment
            //3 : follow
            type:Number
        }
    }
    
})

const Notice = mongoose.model('Notice', noticeSchema)
module.exports = { Notice } 