
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


const  m_resource_collection_= new mongoose.Schema({
/**
 *  基本信息区分
 */
 _id: { type: Number },
 type_id: { type: Number  },
 type_name: { type: String },
 sub_type_id: { type: Number  },
 sub_type_name: { type: String },

/**
 *  发布时间
 */
 ptime: { type: String },

/**
 *  标题
 */
 title: { type: String },

   /**
 *  具体描述
 */
 subtitle: { type: String },
 detail_url: { type: String },

/**
 *  新闻
 */
 doc_id: { type: String },
 is_topic: { type: String },
 doc_url: { type: String },
 has_image: { type: Number },
 has_head: { type: Number },
 has_video: { type: Number },
 video_id: { type: String },
 hasAD: { type: Number },
 priority: { type: Number },

/**
 *  图片类型
 */
 image_type: { type: Number },


/**
 *  图片链接
 */
 image_url: { type: String },
 head_url: { type: String },
 image_urls: { type: String },
 order: { type: String },

/**
 *  视频链接
 */
 video_url: { type: String },


/**
 *  作者
 */
 editor: { type: String },


/**
 *  跟帖人数
 */
 replyCount: { type: Number },
 votecount: { type: Number },
 commentid: { type: String }

});
const publishNewsModel = mongoose.model('b_resource_collection' , m_resource_collection_);

module.exports = publishNewsModel;