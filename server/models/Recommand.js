const mongoose = require('mongoose');

const recommandSchema = mongoose.Schema({

    boardId:{
        type:String
    },
    recommand:{
        type:Array,
        recommandId:{
            type:String
        }

    }
  
});

const Recommand = mongoose.model('Recommand', recommandSchema)
module.exports = { Recommand } 