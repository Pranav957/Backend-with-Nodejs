const Post=require('../models/posts');
const User=require('../models/users');

module.exports.home=function(req,res){
   
    Post.find({}).populate('user').populate({path:'comments',
  populate:{path:'user'}}).then(function( posts){
     User.find({}).then(function(users){
      return res.render('home',{
        title:"Codial/Home",
        posts:posts,
        all_users:users
      });
     }).catch(function(err){
      console.log("Error in finding users");
    });   
  }).catch(function(err){
    console.log("Error in finding posts");
  });

}





 // console.log(req.cookies);
    // res.cookie('user_id',25)
 
    // Post.find({}).then(function( posts){
    //     return res.render('home',{
    //         title:"Codial/Home",
    //         posts:posts
    //     });
    // }).catch(function(err){
    //   console.log("Error in finding posts");
    // });

    // Post.find({}).populate('user').then(function( posts){
    //         return res.render('home',{
    //             title:"Codial/Home",
    //             posts:posts
    //         });
    //     }).catch(function(err){
    //       console.log("Error in finding posts");
    //     });