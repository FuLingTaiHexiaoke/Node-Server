const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, unique: true,default:'' },
  username:{type:String,default:''},
  password: {type:String,default:''},
  passwordResetToken: {type:String,default:''},
  passwordResetExpires: {type:Date,default:''},
  userGravatar:{type:String,default:''},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
