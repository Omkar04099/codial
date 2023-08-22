const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User  = require('../models/users');


// tell passport to use new strategy for google login
passport.use(new googleStrategy({
        clientID: '366114685531-li110tlu5oi4vcad9bbnn107oh4j1jhv.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8000/users/auth/google/callback',
    }, 
    async function(accessToken, refreshToken, profile, done){
        try{
            // find a user 
            let user = await User.findOne({email: profile.emails[0].value}).exec();
            // console.log(accessToken, refreshToken);
            // console.log(profile);
            if(user){
                // if found set this user as req.user
                return done(null, user);
            }else{
                // if not found create the user and set it as req.user(sign in that user)
                try{
                    let newUser = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    });
                    return done(null, newUser);
                }catch(err){
                    if(err){
                        return console.log('Error in creating user google strategy-passport', err);
                    }
                }
                
            }
        }catch(err){
            if(err){
                return console.log('Error in google strategy-passport', err);
            }
        }
        
    }

));


module.exports = passport;
