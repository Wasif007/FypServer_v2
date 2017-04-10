require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require("uglify-js");
var fs = require('fs');
var passport = require('passport');
var session = require('express-session');
require('./app_api/model/db');
require('./app_api/config/passport');
var mongoose=require('mongoose');
var SupervisorValidation=mongoose.model('SupervisorValidation');

var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

var appClientFiles = [
  'app_client/app.js',
  'app_client/supervisor/supervisorCtrl.js',
  'app_client/modules/modulesCtrl.js',
  'app_client/assign/assignCtrl.js',
  'app_client/common/directives/fileUpload.js',
  'app_client/common/services/uploadFileService.js',
  'app_client/history/historyCtrl.js',
  'app_client/common/services/gettingAssignedList.js',
  'app_client/addguard/addguardCtrl.js',
  'app_client/auth/login/login.controller.js',
  'app_client/auth/register/register.controller.js',
  'app_client/common/services/authentication.service.js',
  'app_client/common/services/mean_service.js',
  'app_client/common/services/gettingSupervisorData.js'
];

var uglified = uglifyJs.minify(appClientFiles, { compress : false });

fs.writeFile('public/angular/pingFyp.min.js', uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Script generated and saved:", 'pingFyp.min.js');
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    key: 'user_sid1',
    secret: 'somerandonstuffs1',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid1 && !req.session.user) {
        res.clearCookie('user_sid1');        
    }
    next();
});

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid1) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};


app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid1) {
        res.sendFile(__dirname + '/public/main.html');
    } else {
        res.redirect('/login');
    }
});

// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
   /// console.log('Cookies: ', req.cookies)
    res.redirect('/login');
});

app.use('/api', routesApi);


app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid1) {
        res.clearCookie('user_sid1');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});


app.route('/signup')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/signup.html');
    })
    ;


// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
      var username = req.body.email,
            password = req.body.password;
      
      SupervisorValidation.findOne({ email: username }, 
      function (err, user) {
      if (!user) {
        res.redirect('/login');
      }
      else if (!user.validPassword(password)) {
        res.redirect('/login');
      }
      else
      {
        console.log(user);
        req.session.user = user.email;
        console.log(req.session.user, "asdd");
                res.redirect('/signup');
      }
    });
   });




// catch 405 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 405;
    next(err);
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
