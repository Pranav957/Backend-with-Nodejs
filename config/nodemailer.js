const nodeMailer=require("nodemailer");
const ejs=require('ejs'); //template engine for rendering email templates
const path=require('path');
const env=require('./envirenment');
// let transporter=nodeMailer.createTransport({
//     service:'gmail',
//     host:'smtp.gmail.com',
//     port:587,
//     auth:{
//         user:'kulkarnipranav54@gmail.com',
//         pass:'onoz ixqh tzbd eybq'
//     }
// });

let transporter=nodeMailer.createTransport(env.smtp);

let renderTemplate=(data,relativePath)=>{
    let mailHtml;
    ejs.renderFile(path.join(__dirname,'../views/mailers',relativePath),data,function(err,template){
        if(err)
          {
            console.log('error in rendering Template',err);
            return ;
          }
          mailHtml=template;
    }
    );
    return mailHtml;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}

// user:'recruitmenttrackerteams@gmail.com',
// pass:'hcvvadymyvzsjmjc'