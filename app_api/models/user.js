const mongoose = require('mongoose')
const crpyto = require('crypto')
const jwt = require('jsonwebtoken')
const { setFlagsFromString } = require('v8')

const userSchema = new mongoose.Schema({
    email :{
        type: String,
        unique: true,
        required: true
    },
    name : {
        type: String,
        required: true,
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt,
         1000, 64, 'sha512').toString('hex');
}

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000,
        64, 'sha512').toString('hex');
    return this.hash === hash;    
}

userSchema.methods.generateJwt = function() {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 7);

    return jwt.sign({
        _id: this.is,
        email: this.email,
        name: this.name,
        exp : parseInt(expiration.getTime() / 1000, 10),
    }, process.env.JWT_SECRET); //DO NOT KEEP SECRET IN THE CODE!!
};

mongoose.model('users', userSchema);
