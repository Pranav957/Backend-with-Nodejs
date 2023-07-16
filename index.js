const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const path=require('path');
const app=express();
const cookieParser=require('cookie-parser');
const port=8001;
const bodyParser=new require('body-parser');
// const passport = require('passport');
const { getHeapCodeStatistics } = require('v8');
const MongoStore = require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
   outputStyle:'extended',
   indentedSyntax : false,
    prefix:'/css'
}));
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
app.use(express.static('./assets'));
app.use(expressLayouts);//before we require routes tell all the views going to be rendered belongs to some sort of layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// app.use(express.urlencoded());
app.use(cookieParser());

// app.set('view engine ','ejs');
// app.set('views','./views');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'Views'));
app.use(session({
    name:"codial",
    secret:"man",
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
app.use('/',require('./routes'));


app.listen(port, function(err){
    if(err)
    {
        console.log(`Error occured while running a server: ${err}`);
        return;
    }

    console.log(`Server is Succesfully running on port: ${port}`);
})