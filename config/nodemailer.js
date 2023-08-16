const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


let transpoter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'omkar.hdfcbank@gmail.com',
        pass: 'xyqwpkimfhspklym'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                return console.log('error in rendering template',err);
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}


module.exports = {
    transpoter: transpoter,
    renderTemplate: renderTemplate
}