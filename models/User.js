const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userID: { type: String, unique: true },
  login_name: { type: String, unique: true },
  password: { type: String, default: '' },
  name: String,
  avatar_picture: String,
  thumb_avatar_picture: String,
  phone_number: { type: String, default: '' },
  gender: String,
  birthday: { type: String, default: '' },
  self_detail: { type: String, default: '' },
  email: { type: String },
  location: String,
  website: String,

});

const User = mongoose.model('User', userSchema);

module.exports = User;


