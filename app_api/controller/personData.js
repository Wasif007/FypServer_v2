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
    var query = tokensFromClient.find({}).select('Token -_id');

    query.exec(function (err, someValue) {
        if (err) return next(err);
    });
	var message = {
    to: "f-t20WoRimA:APA91bHnED-RgVoUhZGj7o09dWK2XB_vs5ju9lGp5J422lzIP3h8p4NZgyNOtAEQrJAps4cZoJLn86bba5SEaQoRAYVT7UBhhqG0j4lkmjc7uzDp6Tavhp-Z3qIJgrvnghc7CUgaCcRX",

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
  return  sendJSONresponse(res,200,{
      "Message":" Notification Send",
      "som ":value
    });
    }
});

        
    
  
}
       