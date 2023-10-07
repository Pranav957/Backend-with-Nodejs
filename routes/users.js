const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/users_controller');
const postController=require('../controllers/post_controller');
const { route } = require('./users');
const { Strategy } = require('passport-local');
const { profile } = require('console');

router.get('/profile/:id',passport.checkAuthentication, userController.profile);
router.post('/update/:id',passport.checkAuthentication, userController.update);
// router.get('/post',postController.getPost);
// router.get('/identity',userController.identity);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
// router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);

router.get('/auth/google/callback', function(req, res, next) {
    console.log('Google callback received');
    next();
  }, passport.authenticate('google', { failureRedirect: '/users/sign-in' }), userController.createSession);

router.post('/create-session',passport.authenticate(
     'local',
    {failureRedirect:'/users/sign-in'},
),userController.createSession);

router.get('/sign-out',userController.destroySession);
module.exports=router;