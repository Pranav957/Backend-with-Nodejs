// entry point to all the routes
const express= require('express');
const router=express.Router();
const homeController=require('../controllers/homecontroller');

router.get('/',homeController.home);

console.log('router loaded');

module.exports=router;