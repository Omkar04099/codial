const nodeMailer = require('../config/nodemailer');

// another way of exporting function
exports.newComments = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transpoter.sendMail({
        from: 'omkar.hdfcbank@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published!',
        html: htmlString
    }, (err, info)=>{
        if(err){return console.log('error in sending mail', err)}
        console.log('Message sent', info);
        return;
    });
}