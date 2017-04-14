
const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');


const  m_resource_collection_= new mongoose.Schema({
/**
 *  基本信息区分
 */
//newsID
 uid: { type: String },
 type_id: { type: Number  },
 type_name: { type: String },
 sub_type_id: { type: String ,default:''},
 sub_type_name: { type: String ,default:''},

/**
 *  发布时间
 */
 ptime: { type: Date },

/**
 *  标题
 */
 title: { type: String  ,default:''},

/**
 *  具体描述
 */
 subtitle: { type: String  ,default:''},
 //thumberup_users
 detail_url: { type: String  ,default:''},

/**
 *  新闻
 */
 doc_id: { type: String  ,default:''},
 is_topic: { type: String  ,default:''},
 doc_content: { type: String  ,default:''},
 doc_url: { type: String ,default:'' },
 has_image: { type: Number },
 has_head: { type: Number },
 has_video: { type: Number },
 video_id: { type: String ,default:'' },
 hasAD: { type: Number },
 priority: { type: Number },

/**
 *  图片类型
 */
 image_type: { type: Number },


/**
 *  图片链接
 */
 image_url: { type: String  ,default:''},
 head_url: { type: String  ,default:''},
 image_urls: { type: String  ,default:''},
 order: { type: Number },

/**
 *  视频链接
 */
 video_url: { type: String ,default:'' },


/**
 *  作者
 */
 editor: { type: String  ,default:''},


/**
 *  跟帖人数
 */
 replyCount: { type: Number },
 thumbsupCount: { type: Number },
 commentid: { type: String  ,default:''}

},
 { versionKey: false }
);
const publishNewsModel = mongoose.model('b_resource_collection' , m_resource_collection_);

module.exports = publishNewsModel;