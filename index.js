const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const path=require('path');
const app=express();
const cookieParser=require('cookie-parser');
const port=8001;
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use('/',require('./routes'));
// app.use(express.urlencoded());
app.use(cookieParser());

// app.set('view engine ','ejs');
// app.set('views','./views');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'Views'));

app.listen(port, function(err){
    if(err)
    {
        console.log(`Error occured while running a server: ${err}`);
        return;
    }

    console.log(`Server is Succesfully running on port: ${port}`);
})