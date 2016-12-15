const mongoose = require('mongoose');

const publishNewsRelatedPictures = new mongoose.Schema({
  uid: { type: String, unique: true,default:'' },
  pictureName:{type:String,default:''},
  thumbnailPictureUrl:{type:String,default:''},
  actualPictureUrl:{type:String,default:''},
  isDeleted: {type:String,default:''},
  picturePath: {type:String,default:''},
  pictureSize:{type:Number,default:0},
  newsID:{type:String,default:''},
},
 { versionKey: false }
 );

const PublishNewsRelatedPictures = mongoose.model('PublishNewsRelatedPictures', publishNewsRelatedPictures);

module.exports = PublishNewsRelatedPictures;
