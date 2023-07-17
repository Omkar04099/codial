const express = require('express');
const homeController = require('../controllers/home_controller');
const router = express.Router();

console.log('Router loaded!')

module.exports = router;

router.get('/', homeController.home); 
