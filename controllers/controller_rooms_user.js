var Room_User_Book = require('../models/models_room_user.js');
 
module.exports.save = function(req,res){
     var room = req.body;
     var userRoom = new Room_User_Book({
         name:        room.person1,
         name_another:room.person2,
         room_type:   room.type_room,
         email:       room.email,
         date_to:     room.to,
         date_from:   room.from
        });
    userRoom.save(function(err){
            if(err){
              console.log(err);
                res.send("Error Please Try again");
            }
            else  {
              console.log('show_message', {message: "Advanced Booking Is Done"});
              res.render('hotel/rooms.html');
            }
         });
    
};

module.exports.get = function(req,res){
    Room_User_Book.find({}, function(err,data){
                res.send(data);
            });
  }

/*
module.exports.delete = function(req,res){
    var arr = req.params.id;
    var newid = arr.split(":");
    Orders.remove({_id: newid[1]}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete order with id " + req.params.id});
        } else {
            console.log(data);
            res.render('restaurant/my_orders.html');
        }
    });
};*/