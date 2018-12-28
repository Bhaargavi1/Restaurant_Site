// Requiring all Important things
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended : true}));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/project', { useMongoClient: true});
mongoose.Promise = require('bluebird');

// Using express.static to get the filename of css,images, jss
app.use('/a',express.static("assets"));

// Setting engine for html
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');


// forms -- folder
// Login Options File
app.get('/',function(req,res){
  res.render('forms/login.html'); 
});
// Admin Login File
app.get('/admin_form',function(req,res){
   res.render('forms/admin_form.html');
});
// User Login File
app.get('/user_form',function(req,res){
    res.render('forms/user_form.html');
});


// Choice user
app.get('/main_user', function(req,res){
   res.render('main_user.html');
});


// restaurant -- folder
//restaurant home page
app.get('/main_rest', function(req,res){
   res.render('restaurant/main_rest.html'); 
});
app.get('/food',function(req,res){
  res.render('restaurant/food_order.html');
});
app.get('/myorders',function(req,res){
  res.render('restaurant/my_orders.html');
});
app.get('/reviews_rest',function(req,res){
  res.render('restaurant/reviews.html');
});


// hotel -- folder
// hotel main page
app.get('/main_hotel', function(req,res){
   res.render('hotel/main_hotel.html'); 
});


app.get('/recreation', function(req,res){
   res.render('hotel/recreations.html'); 
});

app.get('/rooms', function(req,res){
   res.render('hotel/rooms.html'); 
});

app.get('/reviews', function(req,res){
   res.render('hotel/reviews_view.html'); 
});

// admin -- folder
// admin main page
app.get('/main_admin', function(req,res){
   res.render('admin/main_admin.html');
});
app.get('/rooms_checkinout', function(req,res){
  res.render('admin/rooms.html');
});

app.get('/allreviews', function(req,res){
  res.render('admin/reviews.html');
});
app.get('/book', function(req,res){
  res.render('admin/bookings.html');
});


// All Controller Files
var form = require(path.join(__dirname+'/controllers/controller_forms.js'));
var orders = require(path.join(__dirname+'/controllers/controller_orders.js'));
var rev_hotel= require(path.join(__dirname+'/controllers/controller_reviews_hotels.js'));
var rev_rest= require(path.join(__dirname+'/controllers/controller_reviews.js'));
var room_admin= require(path.join(__dirname+'/controllers/controller_rooms_admin.js'));
var room_user= require(path.join(__dirname+'/controllers/controller_rooms_user.js'));

// Posting forms for users
app.post('/register', form.signup);
app.post('/login',form.login);
app.post('/send',form.send);
//Posting forms for admin
app.post('/admin_login',form.admin_login);
// Placing Orders
app.post('/placeorder',orders.save);
// Posting and getting reviews for hotel
app.post('/review_hotel',rev_hotel.save);
app.get('/get_review_hotel', rev_hotel.get_review_hotel);
// Posting and getting for restaurant
app.post('/review_rest',rev_rest.save);
app.get('/get_review_rest', rev_rest.get_review_rest);
// Viewing Orders
app.get('/get_orders',orders.get);

// Saving the rooms in admin
app.post('/admin-rooms-book', room_admin.save);
app.get('/get_rooms_admin', room_admin.get);
// Saving the rooms in user
app.post('/user-rooms-book', room_user.save);
app.get('/get_rooms_user', room_user.get);

// Deleting Orders

app.get('/delete/:id',orders.delete);


app.listen(8000);
//Listening to the port
