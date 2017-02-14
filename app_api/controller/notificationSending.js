var mongoose=require('mongoose');
var tokensFromClient=mongoose.model('assignTokens');
//var request=require('request');
//var FCM = require('fcm-push');
 
//var serverKey = 'AAAAKEUqUHQ:APA91bE12teqBTqSpZycw85IKyrGlzSAksoAWOlRI4NLRa51WjnM8acOmp5-KZRyEGw2L87Y0jfkSjwdPIzh4lL3owUz7bLw1JQAZL3v49r1Gg7km-DNheU1fP5ZF1IlaX6IdSONr7kT';
//var fcm = new FCM(serverKey);


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.gettingTokens=function(req,res)
{
if(!req.body.token)
{
  return sendJSONresponse(res,404,{
    "Message":"Token value not provided"
  });

}
else{
  var tokenStoringInDb=new tokensFromClient();
  tokenStoringInDb.Token=req.body.token;

  tokenStoringInDb.save(function(err) {
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      sendJSONresponse(res, 200, {
        "token" : req.body.token
      });
    }
  });
}
}

  /*
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

	*/


module.exports.gettingTokensFromDb=function(req,res)
{
    
  
 }

 module.exports.deletingTokensFromDb=function(req,res)
 {
   
 }

 module.exports.sendingNotificationtoFcm=function(req,res)
 {

 }
