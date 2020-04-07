var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    UserId : {type: Schema.Types.ObjectId,ref:"User"},
    Items : {type: Object}
});

module.exports = mongoose.model('tempCart', schema);