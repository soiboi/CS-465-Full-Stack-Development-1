const passport = require('passport');
const localStrat = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new localStrat(
    {usernameField: 'email'},
    (username, password, done) =>
        {User.findOne({email: username}, (err,user) => {
            if (err) {return done(err);}
            if (!user){
                return done(null, false, {
                    message :'Incorrect username.'});
                };
            if (!user.validPassword(validPassword)) {
                return done(null, false, {
                    message: 'Incorrect password.'});
                }
            return done(null, user);    
        });
    }));
        