var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    username: String,
    password: String,
    email:String,
    avatar: String
});

module.exports = User;