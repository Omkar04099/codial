const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtraxtJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/users');


let opts = {
    jwtFromRequest: ExtraxtJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}


passport.use(new JWTStrategy(opts, async function(jwtPayload, done){
    try{
        let user = await User.findById(jwtPayload._id);

        if(user){
                return done(null, user);
        }else{
            return done(null, false);
        }
    }catch(err){
        return console.log('Error in finding user from JWT', err);
    }

}));

module.exports = passport;