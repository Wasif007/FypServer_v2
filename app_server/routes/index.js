var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
//Loading Client Side
var ctrlClientSide=require('../controllers/clientsidefolder');

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

/* GET home page. */


module.exports = router;
