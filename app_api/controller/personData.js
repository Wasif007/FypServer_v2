var mongoose=require('mongoose');
var tokensFromClient=mongoose.model('assignTokens');

var FCM = require('fcm-push');
 
var serverKey = 'AAAAKEUqUHQ:APA91bE12teqBTqSpZycw85IKyrGlzSAksoAWOlRI4NLRa51WjnM8acOmp5-KZRyEGw2L87Y0jfkSjwdPIzh4lL3owUz7bLw1JQAZL3v49r1Gg7km-DNheU1fP5ZF1IlaX6IdSONr7kT';
var fcm = new FCM(serverKey);


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.gettingDataPerson=function(req,res)
{
  var query = tokensFromClient.find({}).select('token -_id');

    query.exec(function (err, someValue) {
        if (err) return next(err);
        else
        {
        	sendJSONresponse(res,200,{
        		"Message":someValue
        	})
        }
    });
  
}
       