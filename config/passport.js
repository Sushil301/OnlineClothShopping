var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var nodemailer = require('nodemailer');

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, User){
        done(err, User);
    });
});


var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "sushil30198@gmail.com",
        pass: "Sushilr0066"
    }
  });
  var rand,mailOptions,host,link;

  
passport.use('local.signup', new LocalStrategy({
    fname: 'fname',
    lname: 'lname',
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function (req, email, password, done) {
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if (errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages))
    }
    
        User.findOne({'email': email}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false, {message: 'Email is already taken.'});
            }
            var newUser = new User();
            newUser.fname = req.body.fname;
            newUser.lname = req.body.lname;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            if(req.body.isAdmin){
                newUser.isAdmin = true;
            }
            newUser.save(function (err, result) {
                if (err) {
                    return done(err);
                }
                rand=Math.floor((Math.random() * 100) + 54);
                req.session.rand = rand;
                host=req.get('host');
                link="http://"+req.get('host')+"/verify?id="+rand;

                mailOptions={
                  to : req.body.email,
                  subject : "Please confirm your Email account",
                  html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
                }
                console.log(mailOptions);
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                         res.end("error");
                    }else{
                        console.log("Message sent: " + response.message);
                        res.end("sent");
                        res.render('index',{title:'express'});
                    }
                });
                return done(null, newUser);
            });
        });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req, email, password, done){
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty();
    var errors = req.validationErrors();
    if (errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages))
    }
    User.findOne({'email': email}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'No User Found.'});
        }
        if (!user.validPassword(password)){
            return done(null, false, {message: 'Wrong User Name and Password'});
        }
    req.session.emailid = email;
       return done(null, user);
    });
}));