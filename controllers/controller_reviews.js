var Reviews_rest = require('../models/models_review_rest.js');
var P = require('../controllers/controller_forms.js');

module.exports.save= function(req,res){
  console.log(P.name);
 var review = req.body;
  var newReview = new Reviews_rest({
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
              console.log('show_message', {message: "New review added"});
              res.render('restaurant/reviews.html');
            }
         });
};

module.exports.get_review_rest = function(req,res){ 
  Reviews_rest.find({},function(err,data){
      console.log(data);
       res.send(data);
    });
};