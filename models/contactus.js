var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    Full_name: {type: String},
    Email: {type: String},
    Subject: {type: String},
    Message: {type: String}
});

module.exports = mongoose.model('Contactus', schema); 