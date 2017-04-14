const mongoose = require('mongoose');

const UserDetailSchema = new mongoose.Schema({
  detailID: { type: String, unique: true,default:'' },
  title:{type:String,default:''},
  content: {type:String,default:''},
  content_type: {type:String,default:''},
  description_content: {type:Date,default:''},
  description_image:{type:String,default:''},
  section_group: {type:String,default:''},
  section_visulal: {type:Number,default:1},
  user_id: {type:String,default:''}
});

const UserDetail = mongoose.model('UserDetail', UserDetailSchema);

module.exports = UserDetail;
