var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
module.exports.firsturl=function(req,res)
{
 return alert("Hello");
 
}