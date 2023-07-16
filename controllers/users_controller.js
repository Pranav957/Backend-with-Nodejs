const User=require('../models/users');
module.exports.profile=function(req,res){
    res.render('profile',{
        title:"hi its profile"
    });
}

module.exports.identity=function(req,res){
    res.end('<h1>this is your identity</h1>');
}

module.exports.signUp=function(req,res){
  console.log('checking auth for sign up...,',req.isAuthenticated());
  if(req.isAuthenticated())
   {
    console.log('...............simple check .............');
    return res.redirect('/users/profile');
    
   }  
    return res.render('user_sign_up',{
        title:"codial/sign-Up"
    });
}

module.exports.signIn=function(req,res){
  if(req.isAuthenticated())
     return res.redirect('/users/profile');

    return res.render('user_sign_in',{
        title:"codial/sign-Ip"
    });
}
//get the sign in data
module.exports.create=function(req,res){
   
    console.log(req.body.password);
    if(req.body.password!=req.body.confirm_password)
       return res.redirect('back');

    //  User.findOne({email:req.body.email},function(err,user){
    //     if(err){console.log(`error in finding user while signing up`);return;}
    //     if(!user)
    //     {
    //         User.create(req.body,function(err,user){
    //             if(err){console.log(`error in creating user while signing up`);return;}
    //             console.log("user created");
    //             return res.redirect('/users/sign-in');
    //         });
    //     }
    //     else
    //       return res.redirect('back');
    //  });  
    // User.findOne({email:req.body.email}).then(function(err,user){
    //         if(err){console.log(`error in finding user while signing up`);return;}
    //         if(!user)
    //         {
    //             User.create(req.body).then(function(err,user){
    //                 if(err){console.log(`error in creating user while signing up`);return;}
    //                 console.log("user created");
    //                 return res.redirect('/users/sign-in');
    //             });
    //         }
    //         else
    //           return res.redirect('back');
    //      });
    User.findOne({ email: req.body.email })
  .then((user) => {
    if (!user) {
      return User.create(req.body);
    } else {
      return Promise.reject('User already exists'); // Reject the promise if user already exists
    }
  })
  .then((user) => {
    console.log('User created');
    return res.redirect('/users/sign-in');
  })
  .catch((err) => {
    console.log('Error:', err);
    return res.redirect('back');
  });
}
//sign in and create a session for user
module.exports.createSession=function(req,res){
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){
  req.logout(function(err){
    if(err)
     console.log("error while logging out");
  });
  return res.redirect('/');
}