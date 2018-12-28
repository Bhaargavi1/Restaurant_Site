var mongoose = require('mongoose');
var room_user = mongoose.Schema({
   name:{
       type: String,
       required: true
   },
    name_another:{
       type: String
   },
   room_type:{
       type: String,
       required: true
   },
   email:{
       type:String,
       required:true
   },
    date_from:{
        type:String,
        required:true
    },
    date_to:{
        type:String,
        required:true
    }
}); 
module.exports =  mongoose.model("Room_user", room_user);