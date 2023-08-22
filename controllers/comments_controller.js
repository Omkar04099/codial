const Comment = require('../models/comment');
const Post = require('../models/post');
// const { post } = require('../routes');
// const queue = require('../config/kue')
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');


module.exports.create = async function (req, res) {
    try {
        let findPost = await Post.findById(req.body.post);
        if (findPost) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            findPost.comments.push(comment);
            findPost.save();

            comment = await comment.populate('user');
            commentsMailer.newComments(comment);
            // let job = queueMicrotask.create('emails', comment).save(function(err){
            //     if(err){return console.log('error in creating a queue');}

            //     console.log(job.id);
            // });

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created!"
                });
            }

            req.flash('success', 'Comment added!');
            res.redirect('/');
        }
    } catch (err) {
        req.flash('error', err);
    }

}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        console.log(comment)
        if (comment.user == req.user.id) {
            let postId = comment.post;

            comment.deleteOne({ comment: req.params.id });

            let post = Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});

            await Like.deleteMany({likeable: comment_id, onModel: 'Comment'});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: 'Comment deleted'
                })
            }

            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            req.flash('success', 'Comment deleted!');
            return res.redirect('back');
        }
        else {
            req.flash('error', 'You cannot delete this comment!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
    }

}