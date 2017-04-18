const mongoose = require('mongoose');

const publishNewsRelatedThumberup = new mongoose.Schema({
  uid: { type: String ,default:''},
  thumberupUserID:{type:String,default:''},
  thumberupTimestamp: {type:Date,default:''},
  // isThumberuped: {type:Number,default:0},
  newsID:{type:String,default:''}
},
 { versionKey: false }
 );

const PublishNewsRelatedThumberup = mongoose.model('PublishNewsRelatedThumberup', publishNewsRelatedThumberup);

module.exports = PublishNewsRelatedThumberup;

