const User = require('../models/users');
const fs = require('fs');
const path = require('path'); 

module.exports.profile = async function (req, res) {

    let user = await User.findById(req.params.id);

    // if(req.cookies.user_id){
    //     let userFound = await User.findById(req.cookies.user_id);
    //     if(userFound){
    return res.render('users', {
        title: "Profile",
        profile_user: user
    });
    //     }
    // }
    // return res.redirect('/sign-in');
}

module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('****Multer error**** :', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
    
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                    }

                    // saving path of uploaded file into avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
                return res.redirect('back');
            });
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }

    
    
}

module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }


    return res.render('signUp', {
        title: 'Codeial | Sign Up'
    })
}

module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }


    return res.render('signIn', {
        title: 'Codeial | Sign In'
    })
}


// get Sign up data
module.exports.create = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            req.flash('error', 'Password and Confirm password are not same!');
            return res.redirect('back');
        }
        let find = await User.findOne({ email: req.body.email });
        if (find != null) {
            req.flash('error', 'User already exists, please sign in');
            return res.redirect('/sign-in');
        }
        else if (find == null) {
            var createUser = await User.create(req.body);
            // console.log('new User details:',createUser);
            if (createUser != null) {
                req.flash('success', 'Successfully signed in!');
                // console.log('new user added!');
                return res.redirect('/sign-in');
            }
        }
        
    }
    catch (error) {
        req.flash('error', error);
    }


}

// Sign in and create session for user
module.exports.createSession = async function (req, res) {
    req.flash('success', 'Logged in Successfully');
    // Using passport
    return res.redirect('/');


}

module.exports.destroySession = function (req, res) {

    // req.logout((err) => { if(err){console.log(err, "Error in logging out")} });
    req.logout(function (err) {
        if (err) { return next(err); }

        // This one doesn't work above ones work, TODO later
        req.flash('success', 'You have logged out!');
        // console.warn('Logged out Successfully')
        return res.redirect('/');
    });
}