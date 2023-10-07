
const fs=require('fs');
const rfs=require('rotating-file-stream')
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream=rfs.createStream('access.log',{
    interval:"1d",
    path:logDirectory
})
const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codial_development', 
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'kulkarnipranav54@gmail.com',
            pass:'onoz ixqh tzbd eybq'
        }
    },
    google_client_id:"1016506928281-55sf0b97g2f9bebaqcclvp5flnteuagr.apps.googleusercontent.com",
    google_client_secret:"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",
    google_callback_url: "http://localhost:8001/users/auth/google/callback",
    jwt_secret:'codial',
    morgan:{
        mode:'dev',
        options:{
            stream:accessLogStream
        }
    }

}

const production={
    name:'produnction',
    asset_path:process.env.CODIAL_ASSET_PATH,
    session_cookie_key:process.env.CODIAL_SESSION_COOKIE_KEY,
    db:process.env.CODIAL_DB, 
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.CODIAL_GMAIL_USER,
            pass:process.env.CODIAL_GMAIL_PASS
        }
    },
    google_client_id:process.env.CODIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url:process.env.CODIAL_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.CODIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{
            stream:accessLogStream
        }
    }
}

module.exports=development;
// module.exports=eval(process.env.CODIAL_ENVIRONMENT)==undefined?development:eval(process.env.CODIAL_ENVIRONMENT);