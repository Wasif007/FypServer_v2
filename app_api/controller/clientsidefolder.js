var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
module.exports.firsturl=function(req,res)
{
res.sendFile(path.join(__dirname, '../app_client_2', 'index.html'));
 sendJSONresponse(res,200,{
  "Message":"Ok"
 })
}