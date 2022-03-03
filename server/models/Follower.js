const mongoose = require('mongoose');

const followerSchema = mongoose.Schema({

    UserId:{
        type:String
    },
    Myfollowing:{
        type:Array,
        MyfollowingId:{
            type:String
        }

    }
  
});

const Follower = mongoose.model('Follower', followerSchema)
module.exports = { Follower } 