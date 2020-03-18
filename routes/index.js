var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');
var session = require('express-session');

var Order = require('../models/order');

router.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});

router.get('/', function (req, res, next) {
    var successMsg = req.flash('success')[0];
    Product.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {title: 'Shopping Cart', products: productChunks, successMsg: successMsg, noMessage: !successMsg});
    });
});

router.get('/add-to-cart/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  
  Product.findById(productId, function (err, product) {
      if (err){
          return res.redirect('/');
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/');
  });
});

router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});


router.get('/remove/:id', function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/gallery', function (req, res, next) {
  res.render('shop/gallery');
});

router.get('/aboutus', function (req, res, next) {
  res.render('shop/aboutus', {title: 'SWO'});
});

// router.get('/shop', function (req, res, next) {
//     res.render('shop/shop-recommend', {title: 'SWO'});
// });
router.get('/shop', function (req, res, next) {
    Product.find((err,docs) => {
        if(!err){
            res.render('shop/shop-recommend', {list: docs});
        }
        else{
            console.log('error '+err);
        }
    })
});

var rand,mailOptions,host,link;

router.get('/verify',function(req,res){
   
    console.log(req.session.rand);
    if(req.query.id == req.session.rand){
        console.log('Verify');
        res.render('shop/index',{ title: 'CMS'});
    }
    else{
        console.log('Email not verify');
    }
});

router.get('/shopping-cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    console.log(cart.itemprice);
    res.render('shop/shopping-cart', {products: cart.generateArray(), itemPrice: cart.itemprice, totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {ch_total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', isLoggedIn,function(req, res, next){
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    
    var stripe = require('stripe')
    ('sk_test_QaqJahGcyxdz2ByDkEV8exKw00IP5WOGDJ');

    stripe.charges.create(
    {
        amount: cart.totalPrice * 72,
        currency: 'inr',
        source: req.body.stripeToken,
        description: 'Test Charge',
    },
    function(err, charge) {
        if (err){
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            addres: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err, result){
            req.flash('success','Successfully bought product!!')
            req.session.cart = null;
            res.redirect('/');
        });
    });
});


function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
      return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
  }
module.exports = router;