const express=require('express');
const router=express.Router();

const userController=require('../controllers/users_controller');
const postController=require('../controllers/post_controller');

router.get('/profile',userController.profile);
router.get('/post',postController.getPost);
router.get('/identity',userController.identity);

module.exports=router;