//twilio #
var twilio_number = '+12313071512';

// Your accountSid and authToken from twilio.com/user/account
var accountSid = 'ACa3e64a2845c19bc778fc1bf37e6a3b8b';
// var authToken = "{{ auth_token }}";  << original 

var authToken = "0f9456051662bec5e2aa9b591655a4ba";
var client = require('twilio')(accountSid, authToken);
 
//require the Twilio module and create a REST client
// var client = require('twilio')('ACCOUNT_SID', 'AUTH_TOKEN');

var shanNumber = "+19493954894"
var peterNumber = "+821074511080";
var samNumber = "+12147251641";

//Send an SMS text message
client.sendMessage({

    to: samNumber, // Any number Twilio can deliver to
    from: twilio_number, // A number you bought from Twilio and can use for outbound communication
    body: 'word to your mother.' // body of the SMS message

}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."

    }
});


//DEBUGGING
// console.log(client);
// console.log(client.sms);
// console.log(client.sms.messages);