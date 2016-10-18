/**
 * GET /
 * Home page.
 */
/**
 * Models 
 */
const Adimg = require('../models/Adimg');

exports.index = (req, res) => {
//存储数据
const adimg = new Adimg({
      _id:3,
  imgUrl: '/IMG_0142.jpg',
  imgName: 'sorryforlate'
})
//保存数据库
adimg.save(function(err) {
    if (err) {
        console.log('保存失败')
        return;
    }
    console.log('meow');
});
   res.send('Hello World');
};
