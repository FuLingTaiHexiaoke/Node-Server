const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


const advertisementImageSchema = new mongoose.Schema({
 _id: { type: Number },
  imgUrl: String,
  imgName: String
},
 {
    versionKey: false // You should be aware of the outcome after set to false
}
);
const advertisementImage = mongoose.model('Adimg', advertisementImageSchema);

module.exports = advertisementImage;
