/**
 * Module dependencies.
 */
const express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
// const multer = require('multer');
// const upload = multer({ dest:'./public/uploads' });

/**
 * router controllers. 
 */
var index = require('./controllers/index');
var launch = require('./controllers/launch');
var publishNewsController = require('./controllers/PublishNewsController');
var userController = require('./controllers/UserController');




/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.example' });


/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
// mongoose.connect('mongodb://localhost:27017/FuLingOnlineLearningDB');
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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  // if (req.path === '/api/upload') {
  // if (req.path === '/publishNewsController/PublishNewsModel') {

  //   next();
  // }
  // else  if (req.path === '/userController/User') {

  //   next();
  // }  else {
  //   lusca.csrf()(req, res, next);
  // }

  next();

});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
    req.path !== '/login' &&
    req.path !== '/signup' &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
    req.path == '/account') {
    req.session.returnTo = req.path;
  }
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));




/**
 * Primary app routes.
 */


app.use('/index', index);//初始化时的页面
app.use('/launch', launch);//初始化时的页面
app.use('/publishNewsController', publishNewsController);
app.use('/userController', userController);


// app.post('/publishNewsController/PublishNewsModel', upload.array('uploadImage'), function (req, res) {
//    console.log(req.files[0]);  // 上传的文件信息
//    var des_file = __dirname + "/" + req.files[0].originalname;
//    fs.readFile( req.files[0].path, function (err, data) {
//         fs.writeFile(des_file, data, function (err) {
//          if( err ){
//               console.log( err );
//          }else{
//                response = {
//                    message:'File uploaded successfully', 
//                    filename:req.files[0].originalname
//               };
//           }
//           console.log( response );
//           res.end( JSON.stringify( response ) );
//        });
//    });
// })


/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
// app.listen(app.get('port'), () => {
//   console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
//   // console.log('  Press CTRL-C to stop\n');
// });

var certificate = fs.readFileSync('./OpenSSL/certificate.pfx');
var credentials = {pfx: certificate,passphrase:"xiaoke"};
    
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.HTTP_LISTEN_PORT, function() {
    console.log('%s HTTP Server is running on: http://localhost:%s', chalk.green('✓'), process.env.HTTP_LISTEN_PORT);
});
httpsServer.listen(process.env.HTTPS_LISTEN_PORT, function() {
   console.log('%s HTTPS Server is running on: https://localhost:%s', chalk.green('✓'), process.env.HTTPS_LISTEN_PORT);
}); 

module.exports = app;

// exports.upload = upload;
// exports.app = app; 
