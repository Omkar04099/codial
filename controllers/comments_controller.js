const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes');

module.exports.create = async function(req, res){
    let findPost = await Post.findById(req.body.post);
    if(findPost){
        let comment = await Comment.create({
            content:req.body.content,
            post: req.body.post,
            user:req.user._id
        });
        findPost.comments.push(comment);
        findPost.save(); 
        res.redirect('/');
    }
}