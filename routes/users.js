const express=require('express');
const router=express.Router();

const userController=require('../controllers/users_controller');
const postController=require('../controllers/post_controller');
const { route } = require('./users');

router.get('/profile',userController.profile);
router.get('/post',postController.getPost);
router.get('/identity',userController.identity);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);

module.exports=router;