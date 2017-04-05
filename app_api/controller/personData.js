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
    var query = tokensFromClient.find({}).select('Token -_id');
var value;
    query.exec(function (err, someValue) {
        if (err) return next(err);
        else
        {
          value=someValue[0].Token;
          var message = {
    "to": 'fuE87_zokMc:APA91bHnz3oDDaDwr2jGKMtTiyn1jfXNL0TaZslvZnpNDQq7_4R9JlAYFczXvmks1-dToOkhG-W3XdEREi_ERfD8Lgsst--ICt_zHGjVxN7evPbyIpTUBoLJorzKQ-S4O1RkomJRJwd3',
    "notification" : {
        "title" : 'PING Notifications',
        "body" : req.body.name
    },
    "data": {
        "k1": req.body.name,
        "k2": 'Bhai',
        "k3":req.body.lat,
        "k4":req.body.lng,
        "k5":req.body.loc
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
       