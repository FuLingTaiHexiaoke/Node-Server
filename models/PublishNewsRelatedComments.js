const mongoose = require('mongoose');

const publishNewsRelatedComments = new mongoose.Schema({
  uid: { type: String, unique: true,default:'' },
  commentUserID:{type:String,default:''},
  CommentContent: {type:String,default:''},
  commentTimestamp:{type:Date,default:''}, 
  newsID:{type:String,default:''}
},
 { versionKey: false }
 );

const PublishNewsRelatedComments = mongoose.model('PublishNewsRelatedComments', publishNewsRelatedComments);

module.exports = PublishNewsRelatedComments;
