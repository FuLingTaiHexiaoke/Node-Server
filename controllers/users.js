var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


//实例化model
// var getPublishNewsModel = function (req, newsID) {
//   return new PublishNewsModel({
//     /**
//      *  基本信息区分
//      */
//     uid: newsID,
//     // type_id: req.body.type_id,
//     // type_name: req.body.type_name,
//         type_id: 001,
//     type_name:'个人状态发布',

//     sub_type_id: 000,
//     sub_type_name: '',

//     /**
//      *  发布时间
//      */
//     ptime:new Date().toLocaleString(),

//     /**
//      *  标题
//      */
//     title:'',

//     /**
//   *  具体描述
//   */
//     subtitle:'',
//     detail_url: '',

//     /**
//      *  新闻
//      */
//     doc_id: '',
//     is_topic:0,
//     doc_content: req.body.doc_content,
//     doc_url: '',
//     has_image:0,
//     has_head: 0,
//     has_video:0,
//     video_id:'',
//     hasAD:0,
//     priority:000,

//     /**
//      *  图片类型
//      */
//     image_type: 000,


//     /**
//      *  图片链接
//      */
//     image_url: '',
//     head_url: '',
//     image_urls: '',
//     order: '',

//     /**
//      *  视频链接
//      */
//     video_url: '',


//     /**
//      *  作者
//      */
//     editor: req.body.editor,


//     /**
//      *  跟帖人数
//      */
//     replyCount: 0,
//     thumbsupCount:0,
//     commentid:''

//   });
// }