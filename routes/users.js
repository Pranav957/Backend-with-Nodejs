const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/users_controller');
const postController=require('../controllers/post_controller');
const { route } = require('./users');
const { Strategy } = require('passport-local');

router.get('/profile',passport.checkAuthentication, userController.profile);
router.get('/post',postController.getPost);
router.get('/identity',userController.identity);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);


router.post('/create-session',passport.authenticate(
     'local',
    {failureRedirect:'/users/sign-in'},
),userController.createSession);

router.get('/sign-out',userController.destroySession);
module.exports=router;