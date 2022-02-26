const mongoose = require('mongoose');

const followSchema = mongoose.Schema({

    followerId:{
        type:String
    },
    following:{
        type:Array,
        followingId:{
            type:String
        }

    }
  
});

const Follow = mongoose.model('Follow', followSchema)
module.exports = { Follow } 