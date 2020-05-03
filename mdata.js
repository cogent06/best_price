
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/se_project', {useNewUrlParser: true});
var user1 = new mongoose.Schema({
    _id: Number,
    fname: String,
    lname : String,
    password : String
  });

  var user_model = mongoose.model('user', user1);

