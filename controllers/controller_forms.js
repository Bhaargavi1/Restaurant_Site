var User = require('../models/model_forms.js');
var nodemailer = require('nodemailer');
// Function signup called for signup
// Declaring the global variable to get login/register data
module.exports.signup= function(req,res){
     var UserInfo = req.body;
     console.log(UserInfo);
     var newUser = new User({
         name: UserInfo.fname,
         email: UserInfo.email,
         pswd: UserInfo.pswd,
         mobile:UserInfo.mobile
        });
    module.exports.name = UserInfo.fname;
    module.exports.email = UserInfo.email;
   /* making the value of a to "" so that in getdata last registered name is retrieved */
     newUser.save(function(err){
            if(err){
              console.log('show_message', {message: "Database error", type: "error"});
             res.render('forms/user_form.html');
            }
            else  {
              console.log('show_message', {message: "New person added"});
              res.render('main_user.html'); 
            }
         });
 };
// Function for login
module.exports.login = function(req,res){
     var userInfo = req.body; 
     var mail = userInfo.email_login;
     var pass = userInfo.paswd;
     User.findOne({email:mail, pswd : pass}, function(err, result){
         if(err)
             console.log(err);
         else{
            if(result == null)
                res.render('forms/user_form.html');
            else{
                console.log("Success");
                res.render('main_user.html');
                module.exports.name = result.name;
                module.exports.email = result.email;
                console.log(module.exports.email);
            } 
         }
   });    
};
// Function for password Sending
module.exports.send = function(req,res){
var mail_reset = req.body.email_reset;
User.findOne({'email':mail_reset}, function(err, mail_res){
        if(err)
            console.log(err);
        else{
            if(mail_res == null)
                res.send("No Email Found.Please GO Back and Register yourself");
            else{
                 console.log(mail_res);
                res.render('forms/user_form.html');
                data = mail_res.email;
                message = "Your password is " + mail_res.pswd;
              var smtpTransport = nodemailer.createTransport({
                   service: "Gmail",
                   auth: {
                       user: 'bhaargavi.127@gmail.com',
                       pass: '@Iamenginer1'
                   }
               });
             var mailOptions = {
                 from: '<bhaargavi.127@gmail.com>',
                 to: data,
                 subject: 'Sending Email using Node.js',
                 html: message
             };
             smtpTransport.sendMail(mailOptions, function(error, info){
                 if (error) {
                     console.log(error);
                 } else {
                     console.log('Email sent:');
                 }
                });
               }
            }
   });
};
// Function for Login of admin
module.exports.admin_login = function(req,res){
    var admin = req.body;
    var pass = admin.pswd_admin;
    if(pass == '@Bhaargavi123'){
        console.log("Admin Logged in");
        res.render("admin/main_admin.html");
    }
    else{
        console.log("Wrong Password");
        res.render("forms/admin_form.html");
    }
};

