var mongoose=require('mongoose');
var Guard=mongoose.model('Guard');
var moment = require('moment');
moment().format();
var request=require('request');


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.gettingData=function(req,res)
{
	 if(req.params.guardName)
  {
  Guard.findOne({name:req.params.guardName}, function(err, docs) {
    if (!err){ 
sendJSONresponse(res,200,docs);
    } else {
      throw err;
    }
});
  }
  else
  {
    sendJSONresponse(res,404,{
      "Message":"eRROR"
    })
  }

}

module.exports.deleteSpecificGuard=function(req,res)
{
  return sendJSONresponse(res,200,{
    "Message":"Ok"
  })
}
module.exports.guards=function(req,res)
{

	Guard.find({}, function(err, docs) {
    if (!err){ 
sendJSONresponse(res,200,docs);
    } else {
    	throw err;
    }
});
}

module.exports.deleteguardList=function(req,res)
{
	Guard.remove({}, function(err,removed) {
sendJSONresponse(res,200,{
	"Message":" Deleted all data"
})
});
}

module.exports.guardsAssigning=function(req,res)
{
	var image_url_cloudinary;
    image_url_cloudinary=req.file.url;
            
	if(!req.body.email || !req.body.home_address || !req.body.phone  || !req.file.url || !req.body.code || !req.body.name)
	{
		sendJSONresponse(res,404,{
			"message":"Email phone and name are required fields"
		})
		return;
	}	
	var guard=new Guard();
	guard.email=req.body.email;
	guard.phone=req.body.phone;
	guard.name=req.body.name;
	guard.code=req.body.code;
	guard.imageUrl=image_url_cloudinary;
	guard.home_address=req.body.home_address;
 

  var options = {
    uri: 'https://pingfyp.herokuapp.com/api/twilioMessage',
    method: 'POST',
    json: {
      'to':req.body.phone,
      'code':req.body.code
    }
  };


 //request(options, function(error, response, body) {
  //  if (!error && response.statusCode == 200) {
  // 
   guard.createdOn=moment(req.body.createdOn).format("DD-MM-YYYY");
  guard.save(function(err) {
    if (err) {
     return sendJSONresponse(res, 404, err);
     
    } else {
       request(options,function(error,response,body){
        if(!error && response.statusCode===200)
        {
        return sendJSONresponse(res, 200, {
        "Guard saved with data":guard
      });
        }
        else{
          sendJSONresponse(res,404,{
            "Message":error
          })
        }
      })
     
    }
  });  
   // } else {
   //   sendJSONresponse(res,404,{
   //     "Message ":error
   //   })
   // }
//});
    

}