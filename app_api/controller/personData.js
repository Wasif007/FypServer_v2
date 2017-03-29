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
    'registration_ids': ['eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGRjMThiOWIzZjgwZjAwMTA1NmMxMzMiLCJlbWFpbCI6IndAaG90bWFpbC5jb20iLCJuYW1lIjoid2FzaWYiLCJpbWFnZVVybCI6Imh0dHA6Ly9yZXMuY2xvdWRpbmFyeS5jb20vd2FzaWYwMDcvaW1hZ2UvdXBsb2FkL3YxNDkwODE5MjU3L3Bpbmdmb2xkZXIvZmlzN3Y1bnhnenR1YmRmZnhpMWguanBnIiwicGhvbmUiOiIwMzMxNDU3MDI4MCIsImhvbWVfYWRkcmVzcyI6InJlaG1hbiBwYXJrIGd1bGJlcmcgIiwiZXhwIjoxNDkxNDI0MDU3LCJpYXQiOjE0OTA4MTkyNTd9.8InVaIFo9FojpaACZDkPtNttgbq5cjViJuEZMzEhfVg'],
    "notification" : {
        "title" : 'PING Notifications',
        "body" : req.body.name
    },
    "data": {
        "k1": req.body.name,
        "k2": 'Bhai'
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
       