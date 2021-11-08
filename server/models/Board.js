const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({

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
    }

})

const Board = mongoose.model('Board', boardSchema)
module.exports = { Board } 