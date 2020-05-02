var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
   // googleID : { type: mongoose.Schema.Types.String },
    fname: {type: String,required: true},
    lname: {type: String, required:true},
    email: {type: String, required: true,unique:true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean,default: false},
    address: {type:String, default: ""},
    pincode: {type:Number, default:""},
    contactNumber: {type: Number, default: ""},
    Joinon:{type: Date,default: new Date()}
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
