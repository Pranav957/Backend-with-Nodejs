const Post=require('../models/posts');
const Comments=require('../models/comment');

module.exports.getPost=function(req , res){
    res.end('<h1>This is your post</h1>');
}

module.exports.create=async function(req,res){
   
  try{

    let post=await Post.create({
      content:req.body.content,
      user:req.user._id
    });

     if(req.xhr){

      req.flash('success','Post Published!');
      return res.status(200).json({
        data:{
          post:post
        },
        message:"post created!"
      });
     }

   
      return res.redirect('back');

  }catch(err){
    req.flash('error',err);
    console.log('error occured',err);
    return res.redirect('back');

  }
  
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



// module.exports.destroy = function(req, res) {
//   Post.findById(req.params.id).then(function(post) {
//     if (post.user == req.user.id) {
//       post.deleteOne().then(function() { // Handle the promise returned by deleteOne
//         console.log("Post deleted successfully");

//         Comments.deleteMany({ post: req.params.id }).then(function() { // Correct the model name to Comment
//           return res.redirect('back');
//         }).catch(function(err) {
//           console.log(`Error while deleting comments: ${err}`);
//           return res.redirect('back');
//         });
//       }).catch(function(err) {
//         console.log(`Error while deleting post: ${err}`);
//         return res.redirect('back');
//       });
//     } else {
//       return res.redirect('back');
//     }
//   }).catch(function(err) {
//     console.log(`Error while finding post: ${err}`);
//     return res.redirect('back');
//   });
// };

module.exports.destroy =async function(req, res) {
     try{
        
      let post=await Post.findById(req.params.id)
      if (post.user == req.user.id) {
         await post.deleteOne();
          console.log("Post deleted successfully");
          req.flash('successs',"Post deleted successfully");
  
         await Comments.deleteMany({ post: req.params.id })

         if(req.xhr){
          return res.status(200).json({
            data:{
              post_id:req.params.id
            },
            message:"Post deleted"
          })
         }
            return res.redirect('back');
        
      } else {
        req.flash('error','You Can not delete this Post!');
        return res.redirect('back');
           }
     }catch(err)
     {
       req.flash('error',err);
      console.log('error occured',err);
      return res.redirect('back');
  
     }
  }