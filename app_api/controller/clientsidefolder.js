var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
module.exports.firsturl=function(req,res)
{
  console.log("Hello");
  res.sendFile(path.join(__dirname, 'app_client_2'));
 
}