const mongoose = require('mongoose');

const publishNewsRelatedAccusation = new mongoose.Schema({
  uid: { type: String, unique: true ,default:''},
  accusationUserID:{type:String,default:''},
  accusationContent: {type:String,default:''},
  accusationTimestamp: {type:Date,default:''},
  newsID:{type:String,default:''}
},
 { versionKey: false }
 );

const PublishNewsRelatedAccusation = mongoose.model('PublishNewsRelatedAccusation', publishNewsRelatedAccusation);

module.exports = PublishNewsRelatedAccusation;
