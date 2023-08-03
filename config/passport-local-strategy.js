const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    async function(email, password, done){
        // Find a user and establish identity
        let userFound = await User.findOne({email:email});
        if(!userFound || userFound.password != password){
            console.log('Invalid Username/Password');
            return done(null, false);
        }
        return done(null, userFound);
    }
));

// Serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//  Deserializing the user from the key in the cookies 
passport.deserializeUser(async function(id, done){
    let findUser = await User.findById(id);
    if(findUser){
        return done(null, findUser);
    }
    console.log('Error in finding user --> Passport')
    done(null, false);
});

// check if user is authenticated 
passport.checkAuthentication = function(req, res, next){
    // if user is signed in then pass on to next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    return res.redirect('/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains current signed in user from session cookie and we send to local for views
        res.locals.user = req.user
    }

    next();
}

// module.exports = passport;