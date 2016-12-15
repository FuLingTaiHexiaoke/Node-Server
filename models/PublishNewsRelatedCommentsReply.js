const mongoose = require('mongoose');

const publishNewsRelatedCommentsReply = new mongoose.Schema({
  uid: { type: String, unique: true ,default:''},
  commentID:{type:String,default:''},
  replyContent:{type:String,default:''},
  replyTimestamp:{type:Date,default:''},
  newsID:{type:String,default:''}
},
 { versionKey: false }
 );

const PublishNewsRelatedCommentsReply = mongoose.model('PublishNewsRelatedCommentsReply', publishNewsRelatedCommentsReply);

module.exports = PublishNewsRelatedCommentsReply;
