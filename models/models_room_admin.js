var mongoose = require('mongoose');
var room_admin = mongoose.Schema({
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
    room_no:{
        type:String,
        required:true,
        unique:true
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
module.exports =  mongoose.model("Room_admin", room_admin);