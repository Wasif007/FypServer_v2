var mongoose=require('mongoose');
var tokensFromClient=mongoose.model('assignTokens');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.gettingTokens=function(req,res)
{
if(!req.body.token)
{
  return sendJSONresponse(res,401,{
    "Message":"Required fields are not provided"
  });

}
else{
  var tokenStoringInDb=new tokensFromClient();
  tokenStoringInDb.Token=req.body.token;

  tokenStoringInDb.save(function(err) {
    if (err) {
      sendJSONresponse(res, 401, err);
    } else {
      sendJSONresponse(res, 200, {
        "token" : req.body.token
      });
    }
  });
}
}

  


module.exports.gettingTokensFromDb=function(req,res)
{
    tokensFromClient.find({}, function(err, docs) {
    if (!err){ 
sendJSONresponse(res,200,docs);
    } else {
      throw err;
    }
});
  
 }

 module.exports.deletingTokensFromDb=function(req,res)
 {
   tokensFromClient.remove({}, function(err,removed) {
    if(!err)
    {
     sendJSONresponse(res,200,{
  "Message":"Deleted all data"
})
    }

});
 }


