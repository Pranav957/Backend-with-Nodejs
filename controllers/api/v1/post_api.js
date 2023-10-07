const Post=require('../../../models/posts');
const Comments=require('../../../models/comment');


module.exports.index=async function(req,res){

    let posts= await Post.find({}).sort('-createdAt')
.populate('user')
.populate({path:'comments',
populate:{path:'user'}});

    return res.json(200,{
        message:"list of posts",
        posts:posts
    })
}


module.exports.destroy =async function(req, res) {
    try{
       
     let post=await Post.findById(req.params.id)
     if (post && post.user == req.user.id) {
        await post.deleteOne();
         console.log("Post deleted successfully");
        
 
        await Comments.deleteMany({ post: req.params.id })


           return res.json(200,{
            message:"post and associated comments deleted succesfully"
           });

        }else{
            return res.json(401,{
                message:"you cant delete this post"
               });
        }    
    
    }catch(err)
    {
      
     console.log('error occured',err);
     return res.json(500,"Internal server error ");
 
    }
} 