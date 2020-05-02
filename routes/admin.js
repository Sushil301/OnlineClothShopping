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
var Discount = require('../models/discount');


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
      category.find({}).sort({categoryName : 1}).then(categorydocs =>{
        console.log(categorydocs);
        if(categorydocs)
        {
          res.render("admin/product", {
            list:docs ,
            categorydetails:categorydocs
          });
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
   res.redirect('/admin/product');
  });

// router.post('/getdata', function(req,res,next){
//    console.log(req.body.name);
//    res.redirect('/admin/product');
// });

router.post('/getdata', auth.isAdmin, function(req, res, next) {
   Product.findByIdAndUpdate(req.body.prodid, req.body,{new:true}, (err, doc) => {
       if (!err) {
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
      res.render('shop/index', { title: 'category Added' });
      console.log('Inserted');
    }
    else{
      console.log('Error');
    }
  });
}

router.get('/categorywiseproduct/:name',auth.isAdmin, function(req, res, next) {
 Product.find({}).where('productType').equals(req.params.name).then( docs=>{
  if(docs)
  {
    category.find({}).sort({categoryName : 1}).then(categorydocs =>{
      console.log(categorydocs);
      if(categorydocs)
      {
        
        res.render("admin/product", {
          list:docs ,
          categorydetails:categorydocs
        });
      }
    });
  }
  else
  {
    console.log('Error in retriving product data :'+ err);
  }
});
});


router.post('/getSortData',function(req,res,next){
  var querydata = req.body.selectSortpicker;
  console.log("Heloo "+ req.body.selectSortpicker);
  if(querydata == "htl"){
      Product.find({}).sort({price : -1}).then(docs => {
        category.find({}).sort({categoryName : 1}).then(categorydocs =>{
          console.log(categorydocs);
          if(categorydocs)
          {
            
            res.render("admin/product", {
              list:docs ,
              categorydetails:categorydocs
            });
          }
        });
      })
  }
  if(querydata == "lth"){
      Product.find({}).sort({price : 1}).then(docs => {
        category.find({}).sort({categoryName : 1}).then(categorydocs =>{
          console.log(categorydocs);
          if(categorydocs)
          {
            
            res.render("admin/product", {
              list:docs ,
              categorydetails:categorydocs
            });
          }
        });
      })
  }
  
});


router.get('/discount',auth.isAdmin, function(req, res, next) {
  category.find({}).then( docs=>{
   if(docs)
   {
      res.render('admin/addDiscount',{categoryDeatils: docs});
   }
   else{
     console.log("Error while fatching Product Details");
   }
  });
 });
 
 router.post('/addDiscount',auth.isAdmin,function(req,res,next){
  insertDiscount(req,res);
});

function insertDiscount(req,res ){
 if(req.body.save){
   var discount = new Discount({
     category: req.body.discountCategoryName,
     Flat: req.body.flatprice
   });
   discount.save(function(err,result){
      if(err){
        console.log("Error " +err);
      }
      else{
        console.log("Result: " +result);
        res.redirect("/");
      }
   });
 }
 if(req.body.cancel){
   res.redirect("/");
 }
}


router.get('/reports',auth.isAdmin, function(req, res, next) {
  res.render('admin/reports');
 });


module.exports = router;