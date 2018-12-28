var mongoose = require('mongoose');
var reviews_rest_now = mongoose.Schema({
   name:{
       type: String,
       required: true
   },
   email:{
       type: String,
       required: true
   },
    reviews:{
        type:String,
        required:true
    }
}); 
module.exports =  mongoose.model("Reviews_rest_now", reviews_rest_now);