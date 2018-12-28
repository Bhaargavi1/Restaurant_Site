var mongoose = require('mongoose');
var reviews_hotel = mongoose.Schema({
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
module.exports =  mongoose.model("Reviews_hotel", reviews_hotel);