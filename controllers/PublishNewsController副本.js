var express = require('express');

//file upload utilities
var path = require('path')
var gm = require('gm')
var multer = require('multer')
var storage = multer.diskStorage({
  destination: path.resolve('public/uploads/images'),
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
var upload = multer({ storage: storage })

//models
const PublishNewsModel = require('../models/PublishNewsModel');
const PublishNewsRelatedAccusation = require('../models/PublishNewsRelatedAccusation');
const PublishNewsRelatedComments = require('../models/PublishNewsRelatedComments');
const PublishNewsRelatedCommentsReply = require('../models/PublishNewsRelatedCommentsReply');
const PublishNewsRelatedPictures = require('../models/PublishNewsRelatedPictures');
const PublishNewsRelatedThumberup = require('../models/PublishNewsRelatedThumberup');


var router = express.Router();

/* 分段请求所有发布的信息 */
router.get('/PublishNewsModel/:page', function (req, res, next) {
  // PublishNewsModel.find({},(err,docs)=>{
  //   res.send(docs);
  // })

  var pageSize = 15;                   //一页多少条
  var currentPage = req.params.page;                //当前第几页
  var sort = { 'ptime': -1 };            //排序（按发布时间倒序）
  var condition = {};                 //条件
  var skipnum = (currentPage - 1) * pageSize;   //跳过数

  // PublishNewsModel.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, docs) {
  //   if (err) {
  //     console.log("Error:" + err);
  //   }
  //   else {
  //     // console.log("docs:" + docs);
  //     // res.send(docs);
  //     // docs.forEach(function (doc) {
  //     //   PublishNewsRelatedPictures.find({ newsID: doc.uid }, (err, existingPictures) => {
  //     //     // console.log(existingPictures)
  //     //     doc.image_urls =JSON.stringify(existingPictures) ;
  //     //     // doc.image_urls='111';
  //     //     //  console.log( doc.image_urls)
  //     //   });
  //     // }, this);
  //     docs.map(function (doc) {
  //       PublishNewsRelatedPictures.find({ newsID: doc.uid }, (err, existingPictures) => {
  //         doc.image_urls = JSON.stringify(existingPictures);
  //       });
  //     }, this);

  //     // res.send(docs);
  //   // return docs;
  //   }
  // }).then(function (docs) {
  //   res.send(docs);
  // })

  PublishNewsModel.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, docs) {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      var current = Promise.resolve();
      Promise.all(docs.map(function (doc) {
        current = current.then(function () {
          return PublishNewsRelatedPictures.find({ newsID: doc.uid })// returns promise
        }).then(function (result) {
          doc.image_urls = JSON.stringify(result);
          return doc
        });
        return current;
      })).then(function (results) {
        res.send(results);
      })
    }
  });

});




/* 添加发布信息  */
router.post('/PublishNewsModel', upload.array('uploadImage'), function (req, res, next) {

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    // return res.redirect('/');
  }
  //save publishNewsModel 主体信息
  var newID = guid()
  const publishNewsModel = getPublishNewsModel(req, newID);
  PublishNewsModel.findOne({ uid: req.body.id }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      req.flash('errors', { msg: 'PublishNewsModel with that id  already exists.' });
      return res.redirect('/');
    }
    publishNewsModel.save((err) => {
      if (err) {
        console.log(err)
        return next(err);
      }
    });
  });

  //save publishNewsModel 主体关联的图片信息
  const publishNewsRelatedPictures = getPublishNewsRelatedPictures(req, newID);
  console.log('publishNewsRelatedPictures1111' + publishNewsRelatedPictures)
  publishNewsRelatedPictures.forEach(function (element) {
    element.save((err) => {
      if (err) {
        console.log(err)
        return next(err);
      }
      //       else {
      //         var imagePath = element.picturePath;
      //         gm(imagePath)
      //         //   .resize(240, 240, '!')
      //         //   .write('public/uploads/thumbnailImage/' + element.pictureName, function (err) {
      //         //     if (!err) console.log('done');
      //         //     else{
      //         //        console.log(err);
      //         //     }
      //         //   });

      // .thumb(100 , 100, 'public/uploads/thumbnailImage/' + element.pictureName, 50, function(){})

      //       }
    });
  }, this);
  res.send({ state: 0 })
});





/* 删除发布信息  */
router.delete('/PublishNewsModel', function (req, res, next) {
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    // return res.redirect('/');
  }
  // 主体信息
  PublishNewsModel.remove({ uid: req.body.newsID }, (err, DBRes) => {
    if (err) {
      return res.send({ success: 1, data: err });
    }
    // else {
    //   return res.send({ success: 0, data: DBRes });
    // }
  })
    .then(function () {
      PublishNewsRelatedPictures.remove({ newsID: req.body.newsID }, (err, DBRes) => {
        if (err) {
          return res.send({ success: 1, data: err });
        }
      });
    })
    .then(function () {
      PublishNewsRelatedComments.remove({ newsID: req.body.newsID }, (err, DBRes) => {
        if (err) {
          return res.send({ success: 1, data: err });
        }
      });
    })
    .then(function () {
      PublishNewsRelatedCommentsReply.remove({ newsID: req.body.newsID }, (err, DBRes) => {
        if (err) {
          return res.send({ success: 1, data: err });
        }
      });
    })
    .then(function () {
      PublishNewsRelatedThumberup.remove({ newsID: req.body.newsID }, (err, DBRes) => {
        if (err) {
          return res.send({ success: 1, data: err });
        }
      });
    })
    .then(function () {
      PublishNewsRelatedAccusation.remove({ newsID: req.body.newsID }, (err, DBRes) => {
        if (err) {
          return res.send({ success: 1, data: err });
        }
      });
    })
    .then(function () {
      return res.send({ success: 0, data: null });
    })
    ;

});

/* 添加点赞数量和点赞人 */
router.post('/PublishNewsModel/addThumberup', function (req, res, next) {
  //请求检测
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.send({ state: 1, data: errors })
  }
  else {
    // 主体信息
    var publishNewsRelatedThumberup = new PublishNewsRelatedThumberup({
      uid: guid(),
      thumberupUserID: req.body.thumberupUserID,
      thumberupTimestamp: new Date().toLocaleString(),
      newsID: req.body.newsID
    })

    //保存主体信息
    publishNewsRelatedThumberup.save((err) => {
      if (err) {
        console.log(err)
        return res.send({ state: 1, data: err })
      }
      else {
        return res.send({ state: 0 })
      }
    });
  }

});

/* 添加跟帖评论信息和跟帖评论人信息 */
router.post('/PublishNewsModel/addComments', function (req, res, next) {
  //请求检测
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.send({ state: 1, data: errors })
  }
  else {
    // 主体信息
    var publishNewsRelatedComments = new PublishNewsRelatedComments({
      uid: guid(),
      commentUserID: req.body.commentUserID,
      CommentContent: req.body.CommentContent,
      commentTimestamp: new Date().toLocaleString(),
      newsID: req.body.newsID
    })

    //保存主体信息
    publishNewsRelatedComments.save((err) => {
      if (err) {
        console.log(err)
        return res.send({ state: 1, data: err })
      }
      else {
        return res.send({ state: 0 })
      }
    });
  }
});

/* 添加回复跟帖评论信息 */
router.post('/PublishNewsModel/addCommentsReply', function (req, res, next) {
  //请求检测
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.send({ state: 1, data: errors })
  }
  else {
    // 主体信息
    var publishNewsRelatedCommentsReply = new PublishNewsRelatedCommentsReply({
      uid: guid(),
      commentID: req.body.commentUserID,
      replyContent: req.body.replyContent,
      replyTimestamp: new Date().toLocaleString(),
      newsID: req.body.newsID
    })

    //保存主体信息
    publishNewsRelatedCommentsReply.save((err) => {
      if (err) {
        console.log(err)
        return res.send({ state: 1, data: err })
      }
      else {
        return res.send({ state: 0 })
      }
    });
  }
});

/* 添加举报发布信息和举报人信息 */
router.post('/PublishNewsModel/addAccusation', function (req, res, next) {
  //请求检测
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.send({ state: 1, data: errors })
  }
  else {
    // 主体信息
    var publishNewsRelatedAccusation = new PublishNewsRelatedAccusation({
      uid: guid(),
      accusationUserID: req.body.accusationUserID,
      accusationContent: req.body.accusationContent,
      accusationTimestamp: new Date().toLocaleString(),
      newsID: req.body.newsID
    })

    //保存主体信息
    publishNewsRelatedAccusation.save((err) => {
      if (err) {
        console.log(err)
        return res.send({ state: 1, data: err })
      }
      else {
        return res.send({ state: 0 })
      }
    });
  }
});


module.exports = router;


//实例化model
var getPublishNewsModel = function (req, newsID) {
  return new PublishNewsModel({
    /**
     *  基本信息区分
     */
    uid: newsID,
    type_id: req.body.type_id,
    type_name: req.body.type_name,
    sub_type_id: req.body.sub_type_id,
    sub_type_name: req.body.sub_type_name,

    /**
     *  发布时间
     */
    ptime: new Date().toLocaleString(),

    /**
     *  标题
     */
    title: req.body.title,

    /**
    *  具体描述
    */
    subtitle: req.body.subtitle,
    detail_url: req.body.detail_url,

    /**
     *  新闻
     */
    doc_id: req.body.doc_id,
    is_topic: req.body.is_topic,
    doc_content: req.body.doc_content,
    doc_url: req.body.doc_url,
    has_image: req.body.has_image,
    has_head: req.body.has_head,
    has_video: req.body.has_video,
    video_id: req.body.video_id,
    hasAD: req.body.hasAD,
    priority: req.body.priority,

    /**
     *  图片类型
     */
    image_type: req.body.image_type,


    /**
     *  图片链接
     */
    image_url: req.body.image_url,
    head_url: req.body.head_url,
    image_urls: req.body.image_urls,
    order: req.body.order,

    /**
     *  视频链接
     */
    video_url: req.body.video_url,


    /**
     *  作者
     */
    editor: req.body.editor,


    /**
     *  跟帖人数
     */
    replyCount: req.body.replyCount,
    thumbsupCount: req.body.thumbsupCount,
    commentid: req.body.commentid

  });
}

// //实例化model
// //PublishNewsRelatedPictures 
// var getPublishNewsRelatedPictures = function (req, newID) {

//   var publishNewsRelatedPictures = [];
//   req.files.forEach(function (file) {

//     // //save thumber image and get size
//     var originImagePath = file.path
//     var thumber_destination_path = 'public/uploads/thumbnailImage/' + file.filename;
//     // gm(originImagePath).size(function (err, value) {
//     //   if (value != undefined) {

//     //     var image_width_origin = value.width
//     //     var image_height_origin = value.height
//     //     console.log("image_width_origin:" + image_width_origin);
//     //     //save thumber
//          gm(originImagePath).thumb(200 / 5, 200 / 5, thumber_destination_path, 50, function(err, stdout, stderr, command) {


// gm(thumber_destination_path)
// .size(function (err, size) {
//   if (!err){
//     console.log('size' +size.height);
//   }
//     else{
//   console.log('err' +err);
//     }
// });


//          })


//     //   }
//     // })


//         // gm(originImagePath).thumb(image_width_origin / 5, image_height_origin / 5, thumber_destination_path, 50, function (err, stdout, stderr, command) {

//         //   // //get size
//         //   // var imagePath = thumber_destination_path;
//         //   // var image_width = 0;
//         //   // var image_height = 0;

//         //   // gm(imagePath).size(function (err, value) {
//         //   //   if (value != undefined) {
//         //   //     //  console.log("value:" + value);
//         //   //     // var width_height = value.split("x");
//         //   //     image_width = value.width
//         //   //     image_height = value.height
//         //   //     console.log("image_height:" + image_height);

//         //   //     //setup  database data
//         //   //     var publishNewsRelatedPicture = new PublishNewsRelatedPictures({
//         //   //       uid: guid(),
//         //   //       pictureName: file.filename,
//         //   //       thumbnailPictureUrl: 'uploads/thumbnailImage/' + file.filename,
//         //   //       actualPictureUrl: 'uploads/images/' + file.filename,
//         //   //       isDeleted: '0',
//         //   //       picturePath: file.path,
//         //   //       pictureSize: file.size,
//         //   //       imageWidth: image_width_origin,
//         //   //       imageHidth: image_height_origin,
//         //   //       thumberImageWidth: image_width,
//         //   //       thumberImageHidth: image_height,
//         //   //       newsID: newID
//         //   //     });
//         //   //     console.log("publishNewsRelatedPicture:" + publishNewsRelatedPicture);
//         //   //     publishNewsRelatedPictures.push(publishNewsRelatedPicture);
//         //   //     // console.log("publishNewsRelatedPictures:" + publishNewsRelatedPictures);
//         //   //   }
//         //   // })
//         // })





//           //    get size
//           // var imagePath = thumber_destination_path;
//           // // var image_width = 0;
//           // // var image_height = 0;

//           // gm(imagePath).size(function (err, value) {
//           //   if (value != undefined) {
//           //     //  console.log("value:" + value);
//           //     // var width_height = value.split("x");
//           //     // image_width = value.width
//           //     // image_height = value.height
//           //     // console.log("image_height:" + image_height);

//           //     //setup  database data
//           //     var publishNewsRelatedPicture = new PublishNewsRelatedPictures({
//           //       uid: guid(),
//           //       pictureName: file.filename,
//           //       thumbnailPictureUrl: 'uploads/thumbnailImage/' + file.filename,
//           //       actualPictureUrl: 'uploads/images/' + file.filename,
//           //       isDeleted: '0',
//           //       picturePath: file.path,
//           //       pictureSize: file.size,
//           //       imageWidth: image_width,
//           //       imageHidth: image_height,
//           //       // thumberImageWidth: image_width,
//           //       // thumberImageHidth: image_height,
//           //       newsID: newID
//           //     });
//           //     console.log("publishNewsRelatedPicture:" + publishNewsRelatedPicture);
//           //     publishNewsRelatedPictures.push(publishNewsRelatedPicture);
//           //     // console.log("publishNewsRelatedPictures:" + publishNewsRelatedPictures);
//           //   }
//           // })





//               // setup  database data
//               var publishNewsRelatedPicture = new PublishNewsRelatedPictures({
//                 uid: guid(),
//                 pictureName: file.filename,
//                 thumbnailPictureUrl: 'uploads/thumbnailImage/' + file.filename,
//                 actualPictureUrl: 'uploads/images/' + file.filename,
//                 isDeleted: '0',
//                 picturePath: file.path,
//                 pictureSize: file.size,
//                 // imageWidth: image_width_origin,
//                 // imageHidth: image_height_origin,
//                 // thumberImageWidth: image_width,
//                 // thumberImageHidth: image_height,
//                 newsID: newID
//               });
//               console.log("publishNewsRelatedPicture:" + publishNewsRelatedPicture);
//               publishNewsRelatedPictures.push(publishNewsRelatedPicture);


//   }, this);
//  console.log("publishNewsRelatedPictures:" + publishNewsRelatedPictures);
//   return publishNewsRelatedPictures;
// }


// //实例化model
// //PublishNewsRelatedPictures 
// var getPublishNewsRelatedPictures = function (req, newID) {

//   var publishNewsRelatedPictures = [];
//   req.files.forEach(function (file) {
//     // //save thumber image and get size
//     var originImagePath = file.path
//     var thumber_destination_path = 'public/uploads/thumbnailImage/' + file.filename;

//     //get origin image size
//     gm(originImagePath).size(function (err, size) {
//       if (!err) {
//         console.log('size' + size.height);
//         var image_width = size.width;
//         var image_height = size.height;


//         gm(originImagePath).thumb(image_width / 5, image_height / 5, thumber_destination_path, 50, function (err, stdout, stderr, command) {
//           gm(thumber_destination_path).size(function (err, size) {
//             if (!err) {
//               console.log('size' + size.height);

//               // setup  database data
//               var publishNewsRelatedPicture = new PublishNewsRelatedPictures({
//                 uid: guid(),
//                 pictureName: file.filename,
//                 thumbnailPictureUrl: 'uploads/thumbnailImage/' + file.filename,
//                 actualPictureUrl: 'uploads/images/' + file.filename,
//                 isDeleted: '0',
//                 picturePath: file.path,
//                 pictureSize: file.size,
//                 // imageWidth: image_width_origin,
//                 // imageHidth: image_height_origin,
//                 // thumberImageWidth: image_width,
//                 // thumberImageHidth: image_height,
//                 newsID: newID
//               });
//               console.log("publishNewsRelatedPicture:" + publishNewsRelatedPicture);
//               publishNewsRelatedPictures.push(publishNewsRelatedPicture);
//             }
//             else {
//               console.log('err' + err);
//             }
//           });
//         })

//       }
//       else {
//         console.log('err' + err);
//       }
//     });



//   }, this);
//   console.log("publishNewsRelatedPictures:" + publishNewsRelatedPictures);
//   return publishNewsRelatedPictures;
// }





//实例化model
//PublishNewsRelatedPictures 
var getPublishNewsRelatedPictures = function (req, newID) {

  var publishNewsRelatedPictures = [];

  // var current = Promise.resolve();
  // Promise.all(docs.map(function (doc) {
  //   current = current.then(function () {
  //     return PublishNewsRelatedPictures.find({ newsID: doc.uid })// returns promise
  //   }).then(function (result) {
  //     doc.image_urls = JSON.stringify(result);
  //     return doc
  //   });
  //   return current;
  // })).then(function (results) {
  //   res.send(results);
  // })

  var current = Promise.resolve();
  Promise.all(req.files.map(function (file) {
    // //save thumber image and get size
    var originImagePath = file.path
    var thumber_destination_path = 'public/uploads/thumbnailImage/' + file.filename;

    current = current.then(function () {
   return   gm(originImagePath).size(function (err, size) {
        //       if (!err) {
        //         console.log('size' + size.height);
        //         var image_width = size.width;
        //         var image_height = size.height;
        return size  // returns promise
      })}).then(function (size) {
        console.log(size)
        console.log('size' + size.height);
        var image_width_origin = size.width
        var image_height_origin = size.height

        gm(originImagePath).thumb(image_width_origin / 5, image_height_origin / 5, thumber_destination_path, 50, function (err, stdout, stderr, command) {
          gm(thumber_destination_path).size(function (err, size) {
            return size;
          })
        });
      }).then(function (size) {
        console.log('size' + size.height);
        var image_width = size.width;
        var image_height = size.height;
        // setup  database data
        var publishNewsRelatedPicture = new PublishNewsRelatedPictures({
          uid: guid(),
          pictureName: file.filename,
          thumbnailPictureUrl: 'uploads/thumbnailImage/' + file.filename,
          actualPictureUrl: 'uploads/images/' + file.filename,
          isDeleted: '0',
          picturePath: file.path,
          pictureSize: file.size,
          imageWidth: image_width_origin,
          imageHidth: image_height_origin,
          thumberImageWidth: image_width,
          thumberImageHidth: image_height,
          newsID: newID
        });
        console.log("publishNewsRelatedPicture:" + publishNewsRelatedPicture);
        // publishNewsRelatedPictures.push(publishNewsRelatedPicture);
        return publishNewsRelatedPicture
      })
    })).then(function (results) {
      // res.send(results);
      return results
    }).catch(e => {
      // can address the error here and recover from it, from getItemsAsync rejects or returns a falsey value
      throw e; // Need to rethrow unless we actually recovered, just like in the synchronous version
    })


  // req.files.forEach(function (file) {
  //   // //save thumber image and get size
  //   var originImagePath = file.path
  //   var thumber_destination_path = 'public/uploads/thumbnailImage/' + file.filename;

  //   //get origin image size
  //   gm(originImagePath).size(function (err, size) {
  //     if (!err) {
  //       console.log('size' + size.height);
  //       var image_width = size.width;
  //       var image_height = size.height;


  //       gm(originImagePath).thumb(image_width / 5, image_height / 5, thumber_destination_path, 50, function (err, stdout, stderr, command) {
  //         gm(thumber_destination_path).size(function (err, size) {
  //           if (!err) {
  //             console.log('size' + size.height);

  //             // setup  database data
  //             var publishNewsRelatedPicture = new PublishNewsRelatedPictures({
  //               uid: guid(),
  //               pictureName: file.filename,
  //               thumbnailPictureUrl: 'uploads/thumbnailImage/' + file.filename,
  //               actualPictureUrl: 'uploads/images/' + file.filename,
  //               isDeleted: '0',
  //               picturePath: file.path,
  //               pictureSize: file.size,
  //               // imageWidth: image_width_origin,
  //               // imageHidth: image_height_origin,
  //               // thumberImageWidth: image_width,
  //               // thumberImageHidth: image_height,
  //               newsID: newID
  //             });
  //             console.log("publishNewsRelatedPicture:" + publishNewsRelatedPicture);
  //             publishNewsRelatedPictures.push(publishNewsRelatedPicture);
  //           }
  //           else {
  //             console.log('err' + err);
  //           }
  //         });
  //       })

  //     }
  //     else {
  //       console.log('err' + err);
  //     }
  //   });



  // }, this);
  // console.log("publishNewsRelatedPictures:" + publishNewsRelatedPictures);
  // return publishNewsRelatedPictures;
}



function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}