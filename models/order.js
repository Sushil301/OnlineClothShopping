var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    cart: {type: Object},
    address: {type: String},
    name: {type: String},
    paymentId: {type: String}
});

module.exports = mongoose.model('Order', schema); 