var mongoose=require('mongoose');
var AssignGuard=mongoose.model('AssignDutie');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


       
module.exports.assignedDutiesList=function(req,res)
{

	AssignGuard.find({}, function(err, docs) {
    if (!err){ 
sendJSONresponse(res,200,docs);
    } else {
    	throw err;
    }
});
}

module.exports.deleteAssignedDuties=function(req,res)
{
	AssignGuard.remove({}, function(err,removed) {
sendJSONresponse(res,200,{
	"Message":" Deleted all data"
})
});
}

module.exports.assigningDuty=function(req,res)
{

	if(!req.body.supervisorName || !req.body.guardName 
		|| !req.body.supervisorImageUrl  || !req.body.guardImageUrl 
		|| !req.body.time || !req.body.location)
	{
		sendJSONresponse(res,404,{
			"message":"Required fields are not provided"
		})
		return;
	}	
	var guardAssigning=new AssignGuard();
	guardAssigning.supervisorName=req.body.supervisorName;
	guardAssigning.guardImageUrl=req.body.guardImageUrl;
	guardAssigning.supervisorImageUrl=req.body.supervisorImageUrl;
	guardAssigning.guardName=req.body.guardName;
	guardAssigning.time=req.body.time;
	if(req.body.location==='FCSE')
	{
		guardAssigning.location="Faculty of Computer Science";
		guardAssigning.lat="50";
		guardAssigning.lng="50";
	}
	else if(req.body.location==='FEE')
	{
		guardAssigning.location="Faculty of Electronic Engineering";
	guardAssigning.lat="60";
		guardAssigning.lng="60";
	}
	else if(req.body.location==='FCME')
	{
		guardAssigning.location="Faculty of Chemical Engineering";
	guardAssigning.lat="70";
		guardAssigning.lng="70";
	}
	else if(req.body.location==='FME')
	{
		guardAssigning.location="Faculty of Mechnical Engineering";
	guardAssigning.lat="80";
		guardAssigning.lng="80";
	}
	guardAssigning.save(function(err) {
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      sendJSONresponse(res, 200, {
        "Assigned duty saved with data":guardAssigning
      });
    }
  });

}