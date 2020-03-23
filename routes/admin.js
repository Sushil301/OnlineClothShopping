var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var auth = require('../config/auth');
var multer = require('multer');
var path = require('path');
var Product = require('../models/product');
var fs = require('fs');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var session = require('express-session');

var category = require('../models/category');


var url = 'mongodb://localhost:27017/OCM';


router.get('/addproduct', auth.isAdmin ,function(req, res, next) {

  category.find((err,docs)=>{
    if(!err)
    {
      res.render("admin/addproduct", {
       categorydetails:docs
      });
    }
    else
    {
      console.log('Error in retriving data :'+ err);
    }
  });
});

 
 var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'D:/Study/OCM/public/images/productImage');
   },
   filename: function (req, file, cb) {
     cb(null, req.body.productType +'_' + req.body.productName + path.extname(file.originalname));
   }
 });
 var upload = multer({ storage:storage});
 
 router.post('/addproduct',auth.isAdmin,upload.single('productImage'),(req, res ) => {
   insertrecord(req,res);
 });
 function insertrecord(req,res ){
     var prod = new Product();
     prod.productImage = req.file.filename;
     prod.productName = req.body.productName;
     prod.productType = req.body.productType;
     prod.size = req.body.size;
     prod.price = req.body.price;
     prod.description = req.body.description;
     prod.save((err,docs)=>{
       if(!err){
         res.render('shop/index', { title: 'Product Added' });
         console.log('Inserted');
       }
       else{
         console.log('Error');
       }
     });
 }


//  router.get('/viewproduct',upload.single('productImage'),(req, res ) => {
//    res.render('admin/product',{title: 'View Product'});
//  });

 router.get('/product',auth.isAdmin, function(req, res, next) {
   Product.find((err,docs)=>{
     if(!err)
     {
      category.find((err,categorydocs)=>{
        if(!err)
        {
          
          res.render("admin/product", {
            list:docs ,
            categorydetails:categorydocs
          });
        }
        else
        {
          console.log('Error in retriving category data :'+ err);
        }
      });
     }
     else
     {
       console.log('Error in retriving product data :'+ err);
     }
   });
 });

 
router.get('/productdetail/:id',auth.isAdmin ,function(req,res,next){

   var productID = req.params.id;
    Product.findById(productID , (err,docs)=>{
       if(!err)
       {
         res.render("admin/productdetail", {
           prodDetails:docs
         });
       }
       else
       {
         console.log('Error in retriving data :'+ err);
       }
    });
 });


router.get('/delete/:id',auth.isAdmin , (req,res)=>{
   Product.findByIdAndRemove(req.params.id, (err,docs)=>{
     if(!err)
     {
       res.redirect("/admin/product");
     }
     else
     {
       console.log('Error in delete data : ' + err);
     }
   })
 });


 router.get('/update/:id',auth.isAdmin, function(req,res,next){
   var productID = req.params.id;

    Product.findById(productID , (err,docs)=>{
       console.log("get"+productID);
       if(!err)
       {
          req.session.productIDtoUpdate = productID;
          req.session.productnametoUpdate = req.body.productName;

         res.render("admin/updateproduct", {
           updateprodDetails:docs
         });
       }
       else
       {
         console.log('Error in retriving data :'+ err);
       }
    });
 });

  router.post('/updateprod', auth.isAdmin, function(req, res, next){
   console.log(req.body.productName);
   res.redirect('/admin/product');
  });

// router.post('/getdata', function(req,res,next){
//    console.log(req.body.name);
//    res.redirect('/admin/product');
// });

router.post('/getdata', auth.isAdmin, function(req, res, next) {
   console.log(req.body.prodid);
   console.log(req.body.name);


   Product.findByIdAndUpdate(req.body.prodid, req.body,{new:true}, (err, doc) => {
       if (!err) {
          //  console.log('updated');
           res.redirect('/admin/product');
       }
       else{
          console.log(err);
       }
   })
});

router.get('/addcategory', auth.isAdmin ,function(req, res, next) {
  res.render('admin/addcategory');
});

router.post('/addcategory',auth.isAdmin,function(req,res,next){
  insertCategory(req,res);
});

function insertCategory(req,res ){
  var cate = new category();
  cate.categoryName = req.body.categoryName;
  cate.save((err,docs)=>{
    if(!err){
      res.render('shop/index', { title: 'Product Added' });
      console.log('Inserted');
    }
    else{
      console.log('Error');
    }
  });
}

router.get('/categorywiseproduct/:name',auth.isAdmin, function(req, res, next) {
 console.log("Hello" + req.params.name );
 Product.find({}).where('productType').equals(req.params.name).then( docs=>{
  if(docs)
  {
   category.find((err,categorydocs)=>{
     if(!err)
     {
       res.render("admin/product", {
         list:docs ,
         categorydetails:categorydocs
       });
     }
     else
     {
       console.log('Error in retriving category data :'+ err);
     }
   });
  }
  else
  {
    console.log('Error in retriving product data :'+ err);
  }
});
});


module.exports = router;