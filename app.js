/**
 * Module dependencies.
 */
 const express = require('express');
 const session = require('express-session');
 const bodyParser = require('body-parser');
 const errorHandler = require('errorhandler');
 const path = require('path');
 const chalk = require('chalk');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const expressValidator = require('express-validator');
// const node-inspector = require('node-inspector');
const logger = require('morgan');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const apiController = require('./controllers/api');

/**
 * Models
 */
const Adimg = require('./models/Adimg');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/FuLingOnlineLearningDB');
mongoose.connection.on('connected', () => {
  console.log('%s MongoDB connection established!', chalk.green('✓'));
});
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: '123',
  store: new MongoStore({
    url:'mongodb://localhost:27017/FuLingOnlineLearningDB',
    autoReconnect: true
  })
}));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/', homeController.index);


// app.get('/', function (req, res) {
//   //存储数据
// var adimg = new Adimg({
//       id:2,
//   imgUrl: '/IMG_0142.jpg',
//   imgName: 'sorryforlate'
// })
// //保存数据库
// adimg.save(function(err) {
//     if (err) {
//         console.log('保存失败')
//         return;
//     }
//     console.log('meow');
// });
//    res.send('Hello World');
// })
/**
 * API examples routes.
 */
// app.get('/api', apiController.getApi);


/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s Express server listening on port %d in %s mode.', chalk.green('✓'), app.get('port'), app.get('env'));
});

module.exports = app;