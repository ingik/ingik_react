const mongoose = require('mongoose');



const imageBoardSchema = mongoose.Schema({

    index:{
        type: String
    },
    username:{
        type: String
    },
    title:{
        type: String
    },
    content:{
        type: String
    },
    user:{

    },
    createAt:{
        type:Date,
        default:Date.now
    },
    recommand:{
        type: Number,
        default: 0
    },
    unrecommand:{
        type: Number,
        default: 0
    },
    veiwCount:{
        type: Number,
        default: 0
    },
    image:{
        type:Array,
        maxlength:10
    }

})

const ImageBoard = mongoose.model('ImageBoard', imageBoardSchema)
module.exports = { ImageBoard } 