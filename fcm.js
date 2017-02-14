var FCM = require('fcm-push');

var serverKey = 'AIzaSyBm7m_n6qYz9aY_lg0KBLIp021fOd83Bdc';
var fcm = new FCM(serverKey);

var message = {
    to: "f-t20WoRimA:APA91bHnED-RgVoUhZGj7o09dWK2XB_vs5ju9lGp5J422lzIP3h8p4NZgyNOtAEQrJAps4cZoJLn86bba5SEaQoRAYVT7UBhhqG0j4lkmjc7uzDp6Tavhp-Z3qIJgrvnghc7CUgaCcRX",
    notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
    }
};

//callback style
fcm.send(message, function(err, response){
    if (err) {
        console.log("Something has gone wrong!");
    } else {
        console.log("Successfully sent with response: ", response);
    }
});

//promise style
fcm.send(message)
    .then(function(response){
        console.log("Successfully sent with response: ", response);
    })
    .catch(function(err){
        console.log("Something has gone wrong!");
        console.error(err);
    })