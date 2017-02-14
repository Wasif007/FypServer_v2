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
    return sendJSONresponse(res,404,{
      "Message":"Provide Token "
    });
   }
   else
   {
    var tokenGeneration=new tokensFromClient();
    tokenGeneration.Token=req.body.token;
    tokenGeneration.save(function(err) {
    
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
     
      sendJSONresponse(res, 200, {
        "token is " : req.body.token
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
sendJSONresponse(res,200,{
  "Message":" Deleted all data"
})
});
 }
