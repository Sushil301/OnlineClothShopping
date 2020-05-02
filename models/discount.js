var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    category: {type: Schema.Types.ObjectId, ref:'Category'},
    Flat: {type:Number}
});

module.exports = mongoose.model('Discount', schema); 