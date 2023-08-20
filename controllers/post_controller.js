const Post=require('../models/posts');
const Comments=require('../models/comment');

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

// module.exports.destroy=function(req,res){
//   Post.findById(req.params.id).then(function(post){
//     if(post.user==req.user.id)
//      {
//       post.deleteOne().then(function() { // Handle the promise returned by deleteOne
//                 console.log("Post deleted successfully1");
//       });

//       Comments.deleteMany({post:req.params.id}.then(function(){
//         console.log(`comments deleted succesfully`);
//        return res.redirect('back');
//       }).catch(function(err) {
//           console.log(`Error while deleting comments: ${err}`);
//           return res.redirect('back');
//         })); 
//      }
//      else{
//       return res.redirect('back');
//      }
//   }).catch(function(err){
//     console.log(`error while deleting post ${err}`);
//          return res.redirect('back');
//   });
// }



module.exports.destroy = function(req, res) {
  Post.findById(req.params.id).then(function(post) {
    if (post.user == req.user.id) {
      post.deleteOne().then(function() { // Handle the promise returned by deleteOne
        console.log("Post deleted successfully");

        Comments.deleteMany({ post: req.params.id }).then(function() { // Correct the model name to Comment
          return res.redirect('back');
        }).catch(function(err) {
          console.log(`Error while deleting comments: ${err}`);
          return res.redirect('back');
        });
      }).catch(function(err) {
        console.log(`Error while deleting post: ${err}`);
        return res.redirect('back');
      });
    } else {
      return res.redirect('back');
    }
  }).catch(function(err) {
    console.log(`Error while finding post: ${err}`);
    return res.redirect('back');
  });
};
