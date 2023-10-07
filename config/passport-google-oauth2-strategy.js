// const passport=require('passport');
// const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
// const crypto=require('crypto');
// const User=require('../models/users');

// passport.use(new googleStrategy({
//     clientID:"1016506928281-55sf0b97g2f9bebaqcclvp5flnteuagr.apps.googleusercontent.com",
//     clientSecret:"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",
//     callbackURL:"http://localhost:8001/users/auth/google/callback"
// },function(accessTocken,refreshTocken,profile,done){
//     //find user
//     User.findOne({email:profile.emails[0].value}).then(function(err,user){
//         if(err)
//       {
//         console.log('Error in google Strategy passport',err)
//         return;
//       }
//       console.log(profile);
//       console.log(accessTocken,refreshTocken);
       
//       if(user)
//          return done(null,user);
//       else
//       {
//         User.create({
//             name:profile.displayName,
//             email:profile.emails[0].value,
//             password:crypto.randomBytes(20).toString('hex')
//         }).then(function(user){
//             return done(null,user);
//         }).catch(err)
//         {
//            console.log('Error in creating user',err);
//         }
//       }    
//     });
// }));

// module.exports=passport;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');
const env=require('./envirenment');

passport.use(new GoogleStrategy({
  clientID:env.google_client_id,
  clientSecret: env.google_client_secret,
  callbackURL: env.google_callback_url
}, function (accessToken, refreshToken, profile, done) {
  User.findOne({ email: profile.emails[0].value })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString('hex')
        });
      }
    })
    .then((newUser) => {
      return done(null, newUser);
    })
    .catch((err) => {
      console.log('Error in Google Strategy passport:', err);
      return done(err);
    });
}));

module.exports = passport;
