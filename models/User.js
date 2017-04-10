const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, unique: true,default:'' },
  username:{type:String,default:''},
  password: {type:String,default:''},
  passwordResetToken: {type:String,default:''},
  passwordResetExpires: {type:Date,default:''},
  userAvatar:{type:String,default:''},
  gender: {type:String,default:''},
  location: {type:String,default:''}
    // website: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
