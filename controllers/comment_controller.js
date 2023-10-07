const Comment=require("../models/comment");
const Post=require("../models/posts");
const commentMailer=require('../Mailers/commentsMailer');
const commentEmailWorker=require('../Workers/comment_email_worker');
const queue=require('../config/kue');


module.exports.create=function (req, res){
    Post.findById(req.body.post).then(function(post){
        if(post)
        {
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            }).then(async function(comment){
              post.comments.push(comment); //auto fetches id and pushed
              post.save(); //after updating something call save to say that its updated version
              res.redirect('/');
              comment=await comment.populate('user','name email');
            //    commentMailer.newComment(comment); here workers are being used
            let job=queue.create('emails',comment).save(function(err){
                   if(err)
                   {
                    console.log('error in sending to the queue',err);
                    return;
                   }
                   console.log('job enqueued',job.id);
            });

            }).catch(function(err){
                console.log(`Error in creating comment ${err}`); 
            })
        }
    })
}

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id).populate({path:'post', populate:{path:'user'}}).then(function(comment){
        if(comment.user==req.user.id || comment.post.user.id==req.user.id) 
        {
            let postId=comment.post;
            comment.deleteOne().then(function(){
                console.log(`comment deleted successfully`);

                Post.findByIdAndUpdate(postId, {$pull:{ comments:req.params.id}}).then(function(){
                    res.redirect('back');
                }).catch(function(err) {
                    console.log(`Error while deleting commnt inside post array: ${err}`);
                    return res.redirect('back');
                  });
            }).catch(function(err) {
                console.log(`Error while deleting comment: ${err}`);
                return res.redirect('back');
              });
        }
        else
        {
            res.redirect('back');
        }
    }).catch(function(err) {
        console.log(`Error while deleting post: ${err}`);
        return res.redirect('back');
      });
}