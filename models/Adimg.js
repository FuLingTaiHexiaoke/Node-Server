const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');



const adimgSchema = new mongoose.Schema({
 _id: { type: Number },
  imgUrl: String,
  imgName: String
});
const Adimg = mongoose.model('Adimg', adimgSchema);

module.exports = Adimg;
