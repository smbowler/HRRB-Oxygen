var mongoose = require('mongoose');


//from facebook
//displayName, emailAddress, profileImageURL

//additionally
//destination(str), favorite(array or obj), contacts(obj)

var UserSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true
  },
  profileImageURL: {
    type: String,
    required: true,
    unique: true
  },
  destination: {
    type: String,
    required: true
  },

  favorites : [mongoose.Schema.Types.Mixed],

  contacts: mongoose.Schema.Types.Mixed

});

module.exports = mongoose.model('users', UserSchema);