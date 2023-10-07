const passport=require('passport');
const JWTStratargy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const env=require('./envirenment');

const User=require('../models/users');

let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:env.jwt_secret
}

passport.use(new JWTStratargy(opts, async function(jwtPayload,done){

   try{
     
    user=  await User.findById(jwtPayload._id);

    if(user)
      return done(null,user);
    else
      return done(null,false);

   }catch(err){
     console.log('Error in finding user from JWT');
     return done(err, false);
    //  return;
   }

}));

module.exports=passport;