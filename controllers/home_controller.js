const Post = require('../models/post');


module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 27);


    // Populate user for each post
    let posts = await Post.find({}).populate('user').populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    return res.render('home', {
        title:'Codeial | Home',
        posts:posts
    });
    
    
}
