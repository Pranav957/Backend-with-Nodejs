const mongoose=require('mongoose');
const env=require('./envirenment');

mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);

// mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');

const db=mongoose.connection;

db.on("error",console.error.bind(console,"error connecting to database "));

db.once('open',function(){
    console.log('connected to database :MongoDB');
});

module.exports=db;

