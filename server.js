var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./server/users/usermodel');

//express config
var app = express();
app.use(express.static(__dirname + '/www'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


var port = process.env.PORT || 3000;

app.listen(port);
console.log('listening on port:', port);

//connect mongo DB
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/BusitBaby_db';

mongoose.connect(mongoURI);


// API IMPLEMENTATION ----- //

//GET : /api/users/:id : get a single user
app.get('/api/users/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.error('Error occured while looking for id');
    } else {
      return res.send(user);
    }
  });
});

//GET : /apu/users : get all users : used for only testing.
app.get('/api/users', function (req, res){
  User.find(function (err, users){
    if(err){
      console.error("error while getting all users");
    } else {
      return res.send(users);
    }
  })
});

//POST : /api/users : post a single user data from facebook to a server
app.post('/api/users', function (req, res){

  var user = new User({
    displayName: req.body.displayName,
    emailAddress: req.body.emailAddress,
    profileImageURL: req.body.profileImageURL,
    destination: req.body.destination,
    favorites : req.body.favorites,
    contacts: req.body.contacts
  });

  user.save(function (err){
    if(!err){
      return console.error("user has been created!");
    } else {
      return console.error("error while creating a user", err);
    }
  });

  return res.send(user);
});

//PUT : /api/users/:id : update the user info to the server
app.put('/api/users/:id', function (req, res){

  //get the user here
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.error('Error occured while looking for id');
    } else {
      //change the user info
      user.destination = req.body.destination;
      user.favorites = req.body.favorites;
      user.contacts = req.body.contacts;
      //save it to the db.
      user.save(function (err){
        if(!err){
          console.log("updated");
        } else {
          console.error("error while updating the user.");
        }
      });

      //send the update user to the client.
      res.send(user);
    }
  });
})


//-----------------------------------------------------//
//-------- fake user creation for DB testing ----------//
//-----------------------------------------------------//

// var user = new User({
//   displayName: "Ailce Green",
//   emailAddress: "agreen@google.com",
//   profileImageURL: "http://myurl",
//   destination: "Streetcar Depot",
//   favorites : ["des1", "dest2"],
//   contacts: {
//     name: 'mom',
//     phoneNumber : '347-123-3456',
//     message: "almost there."
//   }
// });

// var user = new User({
//   displayName: "Ailce Green1",
//   emailAddress: "agreen@google.com1",
//   profileImageURL: "http://myurl1",
//   destination: "Streetcar Depot1",
//   favorites : ["des11", "dest21"],
//   contacts: {
//     name: 'mom',
//     phoneNumber : '347-123-3456',
//     message: "almost there."
//   }
// });


// user.save(function (err){
//   if(!err){
//     return console.error("user has been created!");
//   } else {
//     return console.error("error while creating a user", err);
//   }
// })





