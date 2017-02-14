var mongoose=require('mongoose');
var tokensFromClient=mongoose.model('assignTokens');
var PORT=process.env.PORT || 300;

var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);

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
var value;
    query.exec(function (err, someValue) {
        if (err) return next(err);
        else
        {
          value=someValue[0].Token;
          var message = {
    "to": value,
    
    "notification" : {
        "title" : 'Title of the notification',
        "body" : 'Body of the notification'
    },
    "data": {
        "title": 'Naeem',
        "body": 'Bhai'
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
      "Person ":req.body.name
    });
    }
});

        }
    });

        
    
  
}
module.exports.gettingFromFarhan=function(req,res)
{
  return sendJSONresponse(res,200,{
    "Message":req.body.name
  });
}

module.exports.gettingForSocket=function(req,res)
{
  io.on("connection",function(socket){
console.log("Connected via socket.io");


socket.emit("message",{
  type:"Message"
});
});
 
 http.listen(PORT,function(){
  console.log("Server started");
});
return sendJSONresponse(res,200,{
  "Message":req.body.name
})

}
       