var mongoose=require('mongoose');
var tokensFromClient=mongoose.model('assignTokens');




var FCM = require('fcm-push');
 
var serverKey = 'AAAAHSygsvw:APA91bEqTlPBHbiov0G-dVs2KAXMprCm9bSHrYusLQHpnQI84ZuJgmfGAz_Nz_0he4yHKza0v7q_eyRwAKWovCiTLfyzjNvDOskXEoeyJ6qrPyLFeSSGXYBF0S48XkoXVOfGUpeLfuOF';
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
    "to": 'cHrhAho78mc:APA91bGmJBA5WzWLMd4Vv1oC5RpPR7ybc6twrNRXmwz2vVhHO_6HXWo5A9TRV-Vxpjj-upA1BXZ0yhRVXrxKfD7pqtKADHpKyy7rEuKKrHsQYMWm0cIfx-Q0eM_uDXo7399TOFEGv3We',
    
    "notification" : {
        "title" : 'PING Notification',
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
       