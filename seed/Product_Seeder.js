var mongoose = require('mongoose');
var Product = require('../models/product');

mongoose.connect('mongodb://localhost:27017/OCM', { useNewUrlParser: true,useUnifiedTopology: true });
        var products = [
            new Product({
                productImage: 'images/w1.jpg',
                productName: 'One Pieces Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 1499

            }),
            new Product({
                productImage: 'images/w2.jpg',
                productName: 'Printed Cold Shoulder Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 850

            }), new Product({
                productImage: 'images/w3.jpg',
                productName: 'Indo Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 850

            }),
            new Product({
                productImage: 'images/w5.jpg',
                productName: 'Jacket Style Princess Cut Indigo Indo Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 2790

            }), new Product({
                productImage: 'images/w4.jpg',
                productName: 'Gown',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 699

            }),
            new Product({
                productImage: 'images/w6.jpg',
                productName: 'Black Gown',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 1599

            }), new Product({
                productImage: 'images/w7.jpg',
                productName: 'Printed Cold Shoulder Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 800

            }),
            new Product({
                productImage: 'images/w8.jpg',
                productName: 'Indo Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 3420

            }), new Product({
                productImage: 'images/w9.jpg',
                productName: 'Printed Cold Shoulder Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 800

            }),
            new Product({
                productImage: 'images/w10.jpg',
                productName: 'jAIPUR ATTIRE Women Cotton Straight Indo Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 3399

            }), new Product({
                productImage: 'images/w11.jpg',
                productName: 'Printed Cold Shoulder Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 800

            }),
            new Product({
                productImage: 'images/w12.jpg',
                productName: 'Printed Cold Shoulder Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 800

            }), new Product({
                productImage: 'images/w13.jpg',
                productName: 'Printed Cold Shoulder Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 800

            }),
            new Product({
                productImage: 'images/14.jpg',
                productName: 'Printed Cold Shoulder Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 800

            }), new Product({
                productImage: 'images/w15.jpg',
                productName: 'Printed Cold Shoulder Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 800

            }),
            new Product({
                productImage: 'images/w16.jpeg',
                productName: 'Printed Cold Shoulder Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 800

            }), new Product({
                productImage: 'images/w17.jpg',
                productName: 'Printed Cold Shoulder Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 800

            }),
            new Product({
                productImage: 'images/w18.jpg',
                productName: 'Printed Cold Shoulder Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 800

            }), new Product({
                productImage: 'images/w19.jpg',
                productName: 'Printed Cold Shoulder Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 800

            }),
            new Product({
                productImage: 'images/w20.jpg',
                productName: 'Printed Cold Shoulder Western Dress',
                productType: 'Kurti',
                size: 'XL',
                description: 'Women Beige & Pink Yoke Design Kurta with Palazzos & Dupatta',
                price: 800
            })
           
        ];
        
        var done = 0;
        for (var i = 0; i < products.length; i++) {
            products[i].save(function(err, result) {
                done++;
                if (done === products.length) {
                    console.log('Inserted');
                    exit();
                }
            });
        }
        
        function exit() {
            mongoose.disconnect();
        }

