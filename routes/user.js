var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var user = require('../models/user');
var Order = require('../models/order');
var Cart = require('../models/cart');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt-nodejs');
var TempCart = require('../models/tempcart');
var auth = require('../config/auth');


var rn = require('random-number');
var gen = rn.generator({
    min:  0,
    max:  99999999,
    integer: true
  })
let randNum = gen(); 
let ranNum1 ;

var csrfprotection = csrf();
router.use(csrfprotection);



router.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  next();
});

router.get('/profile', auth.isLoggedIn, function(req, res, next){
  console.log(req.session.emailid);
  user.find({'email': req.session.emailid} , function(err, userprof){

    if(!err){
      Order.find({user: req.user}, function(err, orders){
        if (err){
          return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order){
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', { userprofile: userprof,orders: orders});

      });
    }
    else{
      console.log("Error : "+ err);
    }
  });

  
 
});

router.get('/contactus', function(req, res, next){
  res.render('user/contactus');
 });


router.get('/logout', function(req, res, next){
  req.logOut();
  req.session.cart = null;

  res.redirect('/');
 });
 
router.use('/', auth.notLoggedIn, function(req, res, next){
    next();
});

router.get('/signup', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
  });
  
  router.post('/signup', passport.authenticate('local.signup',{
    failureRedirect: '/user/signup',
    failureFlash: true
  }),function(req, res, next){
    if (req.session.oldUrl){
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    }
    else{
      res.redirect('user/profile');
    }
  });
  
  
  router.get('/signin', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
  });

  router.post('/signin', passport.authenticate('local.signin',{
    failureRedirect: '/user/signin',
    failureFlash: true
  }),function(req, res, next){
    // if(req.session.cart){
      
    //   var cartsession = req.session.cart;
     
    //   var tempcartobj = new TempCart({
    //     UserId: req.user,
    //     Items: cartsession
    //   });
    //   tempcartobj.save(function(err, result){
    //       if(err){
    //         console.log("Error "+ err);
    //       }
    //       else{
    //         console.log("Result"+result);
    //       }
    //   });
    // }
    // else{
    
    //  TempCart.findOne({'UserId': req.user._id}).then(result =>{
    //    if(result){
    //      req.session.result = result;
    //      var cart = new Cart(req.session.cart1 ? req.session.cart1 : {});
    //     req.session.cartResult = cart;
    //     console.log(req.session.cart1.totalQty);

    //      console.log("result kk"+req.session.result);
    //    }
    //    else{
    //      console.log("Cart empty");
    //    }
    //  });
    // }
    if (req.session.oldUrl){
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    }
    else{
      res.redirect('user/profile');
    }
  });

router.get('/verifyEmail',auth.notLoggedIn,function(req,res,next){
  res.render('user/verifyEmail',{csrfToken: req.csrfToken()});
});

router.post('/verifyEmail', auth.notLoggedIn, function(req, res, next) {    
  var mailOptions,host,link;
     var smtpTransport = nodemailer.createTransport({
         service: "Gmail",
         auth: {
             user: "sushil30198@gmail.com",
             pass: "Sushilr0066"
         }
       });

     // var gen = rn.generator({
     //   min:  0,
     //   max:  99999999,
     //   integer: true
     // })

     // var rand = Math.floor((Math.random() * 100) + 54);
     // req.session.rand = gen();

     console.log("63   "+randNum);
     ranNum1 = randNum;
     host=req.get('host');
     link="http://"+req.get('host')+"/user/forgotPassword/"+randNum;
     user.findOne({email : req.body.regEmail}, function(err,doc){
         if(err) throw err;
         if(doc) {
             req.session.userEmail = req.body.regEmail;
             mailOptions={
                         to : req.body.regEmail,
                         subject : "Reset Password",
                         html : "Hello,<br> Please Click on the link to reset your Password.<br><a href="+link+">Click here to reset</a>"
                       }
                       console.log(mailOptions);
                       smtpTransport.sendMail(mailOptions, function(error, response){
                           if(error){
                               console.log(error);
                                res.end("error");
                           }else{
                               console.log("Message sent: " + response.message);
                              res.render('user/signin');
                           }
                       });  
         }
         else{
             console.log("User Doesn't Registered");
         }
     });
});

router.get('/forgotPassword/:id', function(req, res, next) { 
  req.session.randID = req.params.id;
  res.render('user/forgotPassword', {id: req.params.id,csrfToken: req.csrfToken()});
});

router.post('/forgotPassword', function(req, res, next) { 
  if(req.body.password == req.body.confirmpass){
    console.log("93   "+req.session.randID);
    console.log("94   "+randNum);
    console.log("94   "+ranNum1);

    if(req.session.randID == ranNum1) {
        user.updateOne( { email: req.session.userEmail }, { $set: {password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5), null) } }, function(err,req, res) {
            if (err) 
            res.render('user/forgotPassword',{errMsg : "Error in resetting password " + err,csrfToken: req.csrfToken()});
            else {
                console.log("Password Reset"); 
                delete req.session;  
            }                 
        });
        req.logout();
        res.render('shop/index');
    }   
    else{
        console.log("Invalid Link")
    }
  }
  else{
    res.render('user/forgotPassword',{errMsg : "Password Not Match ", csrfToken: req.csrfToken()});
  }
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

module.exports = router;

//   function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/');
// }
//   function notLoggedIn(req, res, next){
//     if (!req.isAuthenticated()){
//         return next();
//     }
//     res.redirec('/');
// }