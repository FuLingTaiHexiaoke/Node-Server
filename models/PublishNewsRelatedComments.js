const mongoose = require('mongoose');

const publishNewsRelatedComments = new mongoose.Schema({
   uid: { type: String },
  fromUserID: { type: String, default: '' },
  fromUserName: { type: String, default: '' },
  // fromUserModelInfo:{ type: String, default: '' },
  toUserID: { type: String, default: '' },
  toUserName: { type: String, default: '' },
  // fromUserModelInfo:{ type: String, default: '' },
  content: { type: String, default: '' },
  isReply: { type: Number, default: 0 },
  timestamp: { type: Date, default: '' },
  newsID: { type: String, default: '' }
},
  { versionKey: false }
);

const PublishNewsRelatedComments = mongoose.model('PublishNewsRelatedComments', publishNewsRelatedComments);

module.exports = PublishNewsRelatedComments;
