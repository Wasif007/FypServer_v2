var FCM = require('fcm-push');

var serverKey = 'AAAAKEUqUHQ:APA91bE12teqBTqSpZycw85IKyrGlzSAksoAWOlRI4NLRa51WjnM8acOmp5-KZRyEGw2L87Y0jfkSjwdPIzh4lL3owUz7bLw1JQAZL3v49r1Gg7km-DNheU1fP5ZF1IlaX6IdSONr7kT';
var fcm = new FCM(serverKey);

var message = {
    to: '"f-t20WoRimA:APA91bHnED-RgVoUhZGj7o09dWK2XB_vs5ju9lGp5J422lzIP3h8p4NZgyNOtAEQrJAps4cZoJLn86bba5SEaQoRAYVT7UBhhqG0j4lkmjc7uzDp6Tavhp-Z3qIJgrvnghc7CUgaCcRX"', // required fill with device token or topics
    collapse_key: 'your_collapse_key', 
    data: {
        your_custom_data_key: 'your_custom_data_value'
    },
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