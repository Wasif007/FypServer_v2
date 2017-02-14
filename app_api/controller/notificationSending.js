var mongoose=require('mongoose');
var tokensFromClient=mongoose.model('assignTokens');
var request=require('request');

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
  var options={
uri: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: { 'Authorization': 'key=' + 'AAAAKEUqUHQ:APA91bE12teqBTqSpZycw85IKyrGlzSAksoAWOlRI4NLRa51WjnM8acOmp5-KZRyEGw2L87Y0jfkSjwdPIzh4lL3owUz7bLw1JQAZL3v49r1Gg7km-DNheU1fP5ZF1IlaX6IdSONr7kT' },
         json: {
      // note that Sequelize returns token object array, we map it with token value only
      'registration_ids': req.body.token,
      'data': { 'title': "Hello", 'body': 'Naeem Bhai' }
    }
          };
 request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }





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
    var query = tokensFromClient.find({}).select('Token -_id');

    query.exec(function (err, someValue) {
        if (err) return next(err);
        else{
        sendJSONresponse(res,200,someValue);  
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

 module.exports.sendingNotificationtoFcm=function(req,res)
 {

 }
