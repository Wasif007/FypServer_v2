var mongoose=require('mongoose');
var SupervisorValidation=mongoose.model('SupervisorValidation');
var passport=require('passport');


var LocalStrategy = require('passport-local').Strategy;


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.gettingName=function(req,res)
{
  if(req.params.supervisorEmail)
  {
  SupervisorValidation.findOne({email:req.params.supervisorEmail}, function(err, docs) {
    if (docs){ 
return sendJSONresponse(res,200,docs);
    } else if(!docs)
    {
     return sendJSONresponse(res,401,{"Message":"Not found"})
    }

     else 
      return sendJSONresponse(res,401,{"Message":err})
    
});
  }
  else if(!req.params.supervisorEmail)
  {
    sendJSONresponse(res,401,{
      "Message":"Not provided name"
    })
  }
}
module.exports.signup=function(req,res)
{
     if(req.file===undefined || req.file===null)
            {
              return sendJSONresponse(res,401,{
                "Message":"Provide all required fields"
              })
            }
if(!req.body.name || !req.body.password || !req.body.home_address ||!req.body.email || !req.file.url || !req.body.phone )
{
sendJSONresponse(res,401,{
	"Message":"Required Fields are not provided"
});
return;
}

var supervisorToAdd=new SupervisorValidation();
supervisorToAdd.email=req.body.email;
supervisorToAdd.name=req.body.name ;
supervisorToAdd.phone=req.body.phone;
supervisorToAdd.imageUrl=req.file.url;
supervisorToAdd.home_address=req.body.home_address;

supervisorToAdd.setPassword(req.body.password);

supervisorToAdd.save(function(err) {
    var token;
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      token = supervisorToAdd.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
    }
  });

}
module.exports.supervisorList=function(req,res)
{

  SupervisorValidation.find({}, function(err, docs) {
    if (!err){ 
sendJSONresponse(res,200,docs);
    } else {
      throw err;
    }
});
}

module.exports.login=function(req,res)
{ 

  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "Email and password required"
    });
    return;
  }

  passport.authenticate('supervisor-local', function(err, user, info){
    var token;

    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if(user){
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);

}

module.exports.deletesupervisorList=function(req,res)
{
  SupervisorValidation.remove({}, function(err,removed) {
sendJSONresponse(res,200,{
  "Message":" Deleted all data"
})
});
}