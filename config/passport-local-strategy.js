const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require("../models/users");

passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
}, function(req,email,password,done){
    User.findOne({email:email}).then(function(user){
        console.log(user);
        if(!user || user.password!=password)
        {
            console.log("invalid username password");
            req.flash('error','Invalid Username/Password');
            return done(null,false);
        }
        return done(null,user);
    }).catch(function(err){
        console.log('Error in findinf user--> passport')
        req.flash('error',err);
        return done(err);
    })
}));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id).then(function(user){
        return done(null,user);
    }).catch(function(err){
        console.log('Error in findinf user--> passport')
        return done(err);
    });
});

passport.checkAuthentication=function(req, res , next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req, res, next){
    // console.log('check whether user loged in or not...', req.isAuthenticated());
    if(req.isAuthenticated())
     {
        res.locals.user=req.user;
        // console.log('user stored in locals succesfully.........................................................');
     } 

       next();
}