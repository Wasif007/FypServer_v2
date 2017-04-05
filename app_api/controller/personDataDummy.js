var mongoose=require('mongoose');
var tokensFromClient=mongoose.model('assignTokens');




var FCM = require('fcm-push');
 
var serverKey = 'AAAAgOYUnuU:APA91bFJwj4wbhbl6IS8Bz8pQtAQy_rSRBmPm0fXDcqL0h1-SeBFOfxnzy2m2LUaODV_EtB0zwMDhcCQngbRe3VhLcGSyWBx976FX-cSwdRa4HIoMYaUSLHqV1oft7Dv7Ag3MZG-P1VX';
var fcm = new FCM(serverKey);


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.gettingDataPerson=function(req,res)
{
  if(!req.body.name || !req.body.lat || !req.body.lng || !req.body.faculty)
  {
    sendJSONresponse(res,401,{
      "Message":"Required Fields are not provided"
    });
    return;
    }
    var query = tokensFromClient.find({}).select('Token -_id');
  
var value;
    query.exec(function (err, someValue) {
        if (err) return next(err);
        else
        {
          value=someValue[0].Token;
          var message = {
    "to": 'e5biNgrFT9o:APA91bGBtZLMAsatq_HcWZrl6R77nsosnl_rDKjkShsbyHpsWmzUmyWiphcLonftRQ4BtQPypFu-hET1bsa6ex6nFgQ3rIdIMTzZuhKzB6QobyKN51Fax9RTnZP1lMxmvYh8XDPmJLKy',
    "notification" : {
        "title" : 'PING Notifications',
        "body" : req.body.name+req.body.faculty+req.body.lat+req.body.lng
    },
    "data": {
        "name": req.body.name,
        
        "lat":req.body.lat,
        "lng":req.body.lng,
        "faculty":req.body.faculty
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
  
 

return sendJSONresponse(res,200,{
  "Message":req.body.name
})

}
       