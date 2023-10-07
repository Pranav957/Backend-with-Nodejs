const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homecontroller');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

// Import the './Api' module and use it as middleware
const apiRouter = require('./api');
router.use('/api', apiRouter);

console.log('router loaded');

module.exports = router;
