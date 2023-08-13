const Post=require('../models/posts');


module.exports.getPost=function(req , res){
    res.end('<h1>This is your post</h1>');
}

module.exports.create=function(req,res){
  Post.create({
    content:req.body.content,
    user:req.user._id
  }).then(function(post){
    return res.redirect('back');
  }).catch(function(err){
    console.log('error in creating post');
    return;
  })
}