

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.gettingDataPerson=function(req,res)
{
  if(req.body.name)
{
 return sendJSONresponse(res,200,{
    "Message":req.body.name+" Hello Sex"
  })
}
else
{
  return
  sendJSONresponse(res,401,{
    "Message":"Value not provided"
  })
}
}
       