var express = require('express');
const multer = require('multer');
const upload = multer();

var router = express.Router();
const PublishNewsModel = require('../models/PublishNewsModel');
/* GET home page. */
router.get('/PublishNewsModel', function (req, res, next) {
  // advertisementImage.find(function (err, docs) {
  //   if (err) return next(err);
  //   res.send(docs);
  // });
     res.send("Hello!");
});

router.post('/PublishNewsModel',  upload.array('uploadImage'),function (req, res, next) {

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    // return res.redirect('/');
  }

    /**
     *  拦截上传的文件，并保存
     */
var files=req.files;

  const publishNewsModel = new PublishNewsModel({
    /**
     *  基本信息区分
     */
    _id: req.body.id,
    type_id: req.body.type_id,
    type_name: req.body.type_name,
    sub_type_id: req.body.sub_type_id,
    sub_type_name: req.body.sub_type_name,

    /**
     *  发布时间
     */
    ptime: req.body.ptime,

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
    votecount: req.body.votecount,
    commentid: req.body.commentid

  });

  PublishNewsModel.findOne({ _id: req.body.id }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      req.flash('errors', { msg: 'PublishNewsModel with that id  already exists.' });
      return res.redirect('/');
    }
    publishNewsModel.save((err) => {
      if (err) {
        res.send({ state: 1 });
        return next(err);
      }
      res.send({ state: 0 });
    });
  });

});

module.exports = router;
