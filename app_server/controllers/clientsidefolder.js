var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
var sendFiles = function(res,content) {
  res.status(status);
  res.json(content);
};
module.exports.firsturl=function(req,res)
{
	
	console.log("Hello");
	res.sendFile('index.html', { root: path.join(__dirname, 'app_client_2') });

 
}