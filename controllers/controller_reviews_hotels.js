var Reviews_hotel = require('../models/models_review_hotel.js');
var P = require('../controllers/controller_forms.js');

module.exports.save= function(req,res){
  console.log(P.name);
 var review = req.body;
  var newReview = new Reviews_hotel({
         name: P.name,
         email:P.email,
         reviews: review.review
        });
    newReview.save(function(err){
            if(err){
              console.log(err);
              res.send("Try Again"); 
            }
            else  {
              console.log('show_message', {message: "New review added to hotel"});
              res.render('hotel/reviews_view.html');
            }
         });
};

module.exports.get_review_hotel = function(req,res){ 
  Reviews_hotel.find({},function(err,data){
       res.send(data);
    });
};