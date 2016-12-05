var express = require('express');
var router = express.Router();
const advertisementImage = require('../models/AdvertisementImage');
/* GET home page. */
router.get('/getAdvertisementImage', function(req, res, next) {
  advertisementImage.find(function(err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
});

module.exports = router;
