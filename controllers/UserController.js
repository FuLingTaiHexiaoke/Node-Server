var express = require('express');

//file upload utilities
var path = require('path')
var gm = require('gm')
var multer = require('multer')
var storage = multer.diskStorage({
  destination: path.resolve('public/uploads/user_avatar_images'),
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
var upload = multer({ storage: storage })

//models
const UserModel = require('../models/User');


var router = express.Router();



/* 添加信息  */
router.post('/User', upload.array('uploadImage'), function (req, res, next) {

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    // return res.redirect('/');
  }
  //save publishNewsModel 主体信息
  // var newID = guid()
  saveUserModel(req,res);
  // res.send({ state: 0 })
});

/* 请求信息 */
router.get('/User/:login_name', function (req, res, next) {
  var login_name = req.params.login_name;
  var condition = { 'login_name': login_name };                 //条件
  UserModel.find(condition, (err, docs) => {
    res.send(docs);
  })
});



module.exports = router;


//实例化model
//PublishNewsRelatedPictures 
var saveUserModel = function (req, res) {
  var newID = guid();

  // make thumber
  function getThumbAvatar(originImagePath, thumber_destination_path) {
    return new Promise(function (resolve, reject) {
      gm(originImagePath).thumb(100, 100, thumber_destination_path, 100, function (err, stdout, stderr, command) {
        resolve()
      })
    })
  }

  //model
  function getUserModel(file, newID) {
    return new Promise(function (resolve, reject) {
      //实例化UserModel 
      var userModel = function () {
        return new UserModel({
          userID: newID,
          login_name: req.body.login_name, 
          password: req.body.password,
          name: req.body.name,
          avatar_picture: 'uploads/user_avatar_images/' + file.filename,
          thumb_avatar_picture: 'uploads/thumb_user_avatar_images/' + file.filename,
          phone_number: req.body.phone_number,
          gender: req.body.gender,
          birthday: req.body.birthday,
          self_detail: req.body.self_detail,
          email: req.body.email,
          location: req.body.location,
          website: req.body.website,

        });
      }();
      // console.log("userModel:" + userModel);
      resolve(userModel)
    })
  }

  Promise.all(req.files.map(function (file) {
    //data property
    var originImagePath = file.path
    var thumber_destination_path = 'public/uploads/thumb_user_avatar_images/' + file.filename;

    return getThumbAvatar(originImagePath, thumber_destination_path).then(function () {
      return getUserModel(file, newID);
    })
  })).then(function (models) {
    // console.log("usermodel :" + models);
    models.forEach(function (element) {
      element.save((err) => {
        if (err) {
          console.log(err)
          // return next(err);
        }
        else{
  res.send({ state: 0 })
        }
      });
    })

  })
}


function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}