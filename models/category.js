
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    categoryName: {type: String , unique:true},
    status: {type: Boolean,default: true}
});

module.exports = mongoose.model('Category', schema); 