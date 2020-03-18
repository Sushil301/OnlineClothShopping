var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    productImage : {type: String},
    productName : {type: String},
    productType : {type: String},
    size : {type: String},
    price : {type: Number},
    description : {type: String}
});

module.exports = mongoose.model('Product', schema);