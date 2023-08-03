const User = require('../models/users');

module.exports.profile = async function(req, res){
    // if(req.cookies.user_id){
    //     let userFound = await User.findById(req.cookies.user_id);
    //     if(userFound){
            return res.render('users',{
                title: "Profile",
                // user: userFound
            })
    //     }
    // }
    // return res.redirect('/sign-in');
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/profile');
    }


    return res.render('signUp', {
        title:'Codeial | Sign Up'
    })
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
       return res.redirect('/profile');
    }


    return res.render('signIn', {
        title:'Codeial | Sign In'
    })
}


// get Sign up data
module.exports.create = async function(req, res){
    try{
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
    
        let find = await User.findOne({email: req.body.email});
        // console.log('find',find);
        if(find != null){
            // console.log('old user found');
            return res.redirect('/sign-in');
        }
        else if(find == null){
            var createUser = await User.create(req.body);
            // console.log('new User details:',createUser);
        if(createUser != null){
            // console.log('new user added!');
            return res.redirect('/sign-in');
        }
        }
        else{
            return res.redirect('back');
        }
    }
    catch(error){
        if(error){
            console.log('error in',error);
        }
    }
    

}

// Sign in and create session for user
module.exports.createSession = async function(req, res){
    // steps to manual auth

    // // Find user
    // let findUser =await User.findOne({email: req.body.email})
    // // handle user found
    // if(findUser){
    //     // handle password which doesn't match
    //     if(findUser.password != req.body.password){
    //         return res.redirect('back');
    //     }
    //     // handle session creation
    //     res.cookie('user_id', findUser.id);
        
    //     return res.redirect('/profile')
    // }
    // // handle user not found
    // else{
    //     return res.redirect('back')
    // }

    // Using passport

    return res.redirect('/');

    
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        console.log(err,'Error in logging out');
    });
    return res.redirect('/');
}