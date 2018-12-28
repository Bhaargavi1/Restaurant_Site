var mongoose = require('mongoose');
var user_Schema = mongoose.Schema({
         name: String,
         email: {
             type : String,
             unique: true
         },
         pswd: String,
         mobile: Number
       });
module.exports =  mongoose.model("User", user_Schema);