const express= require('express');
const router=express.Router();
const passport=require('passport');
const postsapi=require('../../../controllers/api/v1/post_api');
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsapi.destroy);
router.get('/',postsapi.index);
module.exports=router;