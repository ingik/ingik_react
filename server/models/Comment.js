const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  boardId: {
    type: String,
  },
  commentList: {
      type:Array,
    userId: {
      type: String,
    },
    content: {
      type: String,
    },
  },
});

const Comment = mongoose.model('Comment', commentSchema)
module.exports = { Comment } 