//var client = require('twilio')('AC678ea2ec1d3504e754eaeffce34b6bea', '22c8728b18ee523c272c4efc44919e04');
var client = require('twilio')('AC0a6d3db43ee017f911b5bebfe46f9912', '1022af299dd9855402594b7034fd18c1');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.sendingMessage = function(req, res) {
 
if(!req.body.code || !req.body.to)
{
sendJSONresponse(res,404,{
  "Message":"Code and Phone Number required"
});
return;

}
  client.messages.create({
    body: req.body.code, 
    to: req.body.to,
    from: '+12566661470'
    // mediaUrl: 'http://www.yourserver.com/someimage.png'
  }, function(err, data) {
    if (err) {
      console.error('Could not notify administrator');
      console.error(err);
      sendJSONresponse(res,401,{
        "Messsage":err
      });
      return;

    } 
    else {
      sendJSONresponse(res,200,{
        "Message":"Administrator notified"
      });
    }
  });
};