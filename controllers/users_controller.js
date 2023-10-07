const User=require('../models/users');
module.exports.profile=function(req,res){
  User.findById(req.params.id).then(function(user){
    res.render('profile',{
      title:"hi its profile",
      profile_user:user
  });
  }).catch(function(err){
   console.log(`error ocvured while finding user`);
  });
    
}

// module.exports.update=function(req,res){
//   if(req.user.id==req.params.id){
//     User.findByIdAndUpdate(req.params.id, req.body).then(function(user){
//       res.redirect('back');
//     }).catch(function(err){
//       console.log(`error while updating user`);
//     });
//   }else{
//     return res.status(401).send('Unauthorized');
//   }
// }
// User.findByIdAndUpdate(req.params.id, {name:req.body.name, email:req.body.email})

const fs=require('fs');
const path=require('path');

async function checkFileExists(filePath) {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports.update= async function(req,res){
    if(req.user.id==req.params.id)
    {
      try{

       let user=await User.findById(req.params.id);

       User.uploadedAavatar(req,res,function(err){

        if(err)
        {
           console.log('*****MULTER_error',err);
        }

          user.name=req.body.name;
          user.email=req.body.email;

          console.log(req.file);

          if(req.file)
          {
            const fileExists =  checkFileExists(user.avatarPath);
            if(user.avatar && fileExists)
            {
               fs.unlinkSync(path.join(__dirname,'..',user.avatar));
            }
            user.avatar=User.avatarPath+'/'+req.file.filename;
          }
          user.save();
          return  res.redirect('back');
       });

      }catch(err){
        req.flash('error',err);
        console.log('error occured',err);
        return res.redirect('back');
    
      }
    } else{
    return res.status(401).send('Unauthorized');
  }
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
  req.flash('success','Logged in Successfully');
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){
  req.logout(function(err){
    if(err)
     console.log("error while logging out");
  });
  req.flash('success','You have Logged out');
  return res.redirect('/');
}