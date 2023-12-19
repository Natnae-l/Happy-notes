const express = require('express');
const mainController = require('../controllers/mainController')
const checkAuth = require('../auth/checkAuth');

const router = express.Router();


// get home page
router.get('/', mainController.homePage);
// get about page
router.get('/about', checkAuth, mainController.aboutPage)

module.exports = router;