var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var auth = require('../config/auth');
var multer = require('multer');
var path = require('path');
var Product = require('../models/product');
var nodemailer = require('nodemailer');
var assert = require('assert');
var session = require('express-session');
var Contact = require('../models/contactus');


var url = 'mongodb://localhost:27017/OCM';

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "sushil30198@gmail.com",
        pass: "Sushilr0066"
    }
  });
  var rand,mailOptions,host,link;

router.get('/contactus' ,function(req, res, next) {

    res.render('contact/contactus', { title: "Contcat Us"});
});

router.post('/contactus' ,function(req, res, next) {

    if(req.body.send){
        var contactobj = new Contact({
            Full_name: req.body.name,
            Email: req.body.email,
            Subject: req.body.subject,
            Message: req.body.message
        });
        contactobj.save(function(err,result){
            if(!err){
                rand=Math.floor((Math.random() * 100) + 54);
                // req.session.rand = rand;
                host=req.get('host');
               // link="http://"+req.get('host')+"/contact/verify?id="+rand;

                mailOptions={
                  to : "yadavsushil1439@gmail.com",
                  subject : req.body.subject,
                  html : "Hello Admin,<br> <p>My Name "+req.body.name+" and i want inquiry about "+req.body.subject+".</p><hr>Message : "+req.body.message+" <br> Email-id :"+req.body.email+""
                }
                console.log(mailOptions);
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                         res.end("error " + error);
                    }else{
                        console.log("Message sent: " + response.message);
                        res.redirect('/');
                    }
                });

            }
            else{
                console.log("Error : "+ err);
            }
        });
    }
});



module.exports = router;