var mongoose=require('mongoose');
var tokensFromClient=mongoose.model('assignTokens');




var FCM = require('fcm-push');
 
var serverKey = 'AAAAgOYUnuU:APA91bFJwj4wbhbl6IS8Bz8pQtAQy_rSRBmPm0fXDcqL0h1-SeBFOfxnzy2m2LUaODV_EtB0zwMDhcCQngbRe3VhLcGSyWBx976FX-cSwdRa4HIoMYaUSLHqV1oft7Dv7Ag3MZG-P1VX';
var fcm = new FCM(serverKey);


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var sendFile = function(res, content) {
  res.sendFile(content);
};

module.exports.gettingDataPerson=function(req,res)
{
  var lat="";
  var lng="";
  var faculty="";
  if(!req.body.name || !req.body.location)
  {
    sendJSONresponse(res,401,{
      "Message":"Required Fields are not provided"
    });
    return;
    }
  
       if(req.body.location==='FCSE')
  {
    faculty="Faculty of Computer Science";
    lat="34.069277";
    lng="72.643207";
  }
  else if(req.body.location==='FEE')
  {
    faculty="Faculty of Electronic Engineering";
    lat="34.069838";
    lng="72.64224";
  }
  else if(req.body.location==='FCME')
  {
    faculty="Faculty of Chemical Engineering";
    lat="34.070217";
    lng="72.645503";
  }
  else if(req.body.location==='FME')
  {
    faculty="Faculty of Mechnical Engineering";
    lat="34.069374";
    lng="72.644932";
  } 
          var message = {
    "to": 'e5biNgrFT9o:APA91bGBtZLMAsatq_HcWZrl6R77nsosnl_rDKjkShsbyHpsWmzUmyWiphcLonftRQ4BtQPypFu-hET1bsa6ex6nFgQ3rIdIMTzZuhKzB6QobyKN51Fax9RTnZP1lMxmvYh8XDPmJLKy',
    "notification" : {
        "title" : 'PING Notifications',
        "body" : req.body.name
    },
    "data": {
        "name": req.body.name,
        "lat":lat,
        "lng":lng,
        "faculty":faculty
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

module.exports.sendingSimple=function(req,res)
{
  sendJSONresponse(res,200,{
    "bodys":req.file.url
  })
}
       