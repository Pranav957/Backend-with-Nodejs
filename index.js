const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-Strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const path=require('path');
const app=express();
require('./config/view-helpers')(app);
const env=require('./config/envirenment');
const logger=require('morgan');
const cookieParser=require('cookie-parser');
const port=8001;
const bodyParser=new require('body-parser');
// const passport = require('passport');
const { getHeapCodeStatistics } = require('v8');
const MongoStore = require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

app.use(logger(env.morgan.mode,env.morgan.options));
if(env.name=='development')
{
    app.use(sassMiddleware({
        // src:'./assets/scss', 
        // dest:'./assets/css',
        src:path.join(__dirname,env.asset_path,'scss'),
        dest:path.join(__dirname,env.asset_path,'css'),
        debug:true,
       outputStyle:'extended',
       indentedSyntax : false,
        prefix:'/css'
    }));
}
// app.use(
//     sassMiddleware({
//       src: path.join(__dirname, 'assets', 'scss'),
//       dest: path.join(__dirname, 'assets', 'css'),
//       debug: true,
//       outputStyle: 'extended',
//       prefix: '/css'
//     })
//   );
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(env.asset_path));
app.use(expressLayouts);//before we require routes tell all the views going to be rendered belongs to some sort of layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(cookieParser());


// app.set('views','./views');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'Views'));
app.use(session({
    name:"codial",
    // secret:"man",
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    // store:new MongoStore({
    //   mongooseConncetion:db,
    //   autoRemove:'disabled'
    // },
    // function (err) {
    //     console.log(err || "connect- mongodb setup ok");
    // })
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development' })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));
// to make uploads path availbe to browser
app.use('/uploads',express.static(__dirname+'/uploads'));

// setup chatServer

const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_socket').chatSocket(chatServer);

// you need to configure the server running at http://localhost:5000 to include the appropriate CORS headers in its responses, specifically the 'Access-Control-Allow-Origin' header. This header specifies which origins are allowed to access the server's resources.
// const io = require('socket.io')(chatServer, {
//     cors: {
//       origin: 'http://localhost:8001',
//       methods: ['GET', 'POST']
//     }
//   });

chatServer.listen(5000);
console.log('chat server is running on port 5000');

app.listen(port, function(err){
    if(err)
    {
        console.log(`Error occured while running a server: ${err}`);
        return;
    }

    console.log(`Server is Succesfully running on port: ${port}`);
})