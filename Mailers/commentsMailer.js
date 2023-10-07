const nodeMailer=require('../config/nodemailer');

exports.newComment=(comment)=>{
    console.log('Inside new comment mailer',comment);
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from:'kulkarnipranav54@gmail.com',
        to:comment.user.email,
        subject:"New comment published!",
        // html:'<h1>yup,Your comment is now published!</h1>'
        html:htmlString
    },(err,info)=>{
        if(err)
        {
            console.log('error in sending mail',err);
            return;
        }

        console.log("message sent",info);
        return;
    });

}