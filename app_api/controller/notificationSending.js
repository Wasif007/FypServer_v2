var mongoose=require('mongoose');
var tokensFromClient=mongoose.model('assignTokens');
var request=require('request');
var FCM = require('fcm-push');
 
var serverKey = 'AAAAKEUqUHQ:APA91bE12teqBTqSpZycw85IKyrGlzSAksoAWOlRI4NLRa51WjnM8acOmp5-KZRyEGw2L87Y0jfkSjwdPIzh4lL3owUz7bLw1JQAZL3v49r1Gg7km-DNheU1fP5ZF1IlaX6IdSONr7kT';
var fcm = new FCM(serverKey);


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.gettingTokens=function(req,res)
{
var message = {
    to: req.body.token, // required fill with device token or topics
    notification: {
        title: 'Person Identication'
    },
    data: {
        title: 'Naeem',
        body: 'Bhai'
    }
};
//callback style
fcm.send(message, function(err, response){
    if (err) {
        console.log("Something has gone wrong!");
    } else {
        console.log("Successfully sent with response: ", response);
    sendJSONresponse(res,200,{
      "Message":" FCM"
    })
    }
});

	/* if(!req.body.token)
   {
    return sendJSONresponse(res,404,{
      "Message":"Provide Token "
    });
   }
   else
   {
  var options={
uri: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: { 'Authorization': 'key=' + 'AAAAKEUqUHQ:APA91bE12teqBTqSpZycw85IKyrGlzSAksoAWOlRI4NLRa51WjnM8acOmp5-KZRyEGw2L87Y0jfkSjwdPIzh4lL3owUz7bLw1JQAZL3v49r1Gg7km-DNheU1fP5ZF1IlaX6IdSONr7kT' },
         json: {
      // note that Sequelize returns token object array, we map it with token value only
      'to':"f-t20WoRimA:APA91bHnED-RgVoUhZGj7o09dWK2XB_vs5ju9lGp5J422lzIP3h8p4NZgyNOtAEQrJAps4cZoJLn86bba5SEaQoRAYVT7UBhhqG0j4lkmjc7uzDp6Tavhp-Z3qIJgrvnghc7CUgaCcRX",
      'data': { 'title': "Hello", 'body': 'Naeem Bhai' }
    }
          };
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // request was success, should early return response to client
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
    
  });
    }
   */
}

module.exports.gettingTokensFromDb=function(req,res)
{
    
  
 }

 module.exports.deletingTokensFromDb=function(req,res)
 {
   
 }

 module.exports.sendingNotificationtoFcm=function(req,res)
 {

 }
