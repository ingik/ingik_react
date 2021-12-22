const mongoose = require('mongoose');


const roomSchema = mongoose.Schema({
    
    index:{
        type: String
    },
    roomName:{
        type: String
    },
    
    
    
    
})

const Room = mongoose.model('Room', roomSchema)
module.exports = { Room } 