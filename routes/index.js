const express = require('express');
const mainController = require('../controllers/mainController')

const router = express.Router();


// get home page
router.get('/', mainController.homePage);
// get about page
router.get('/about', mainController.aboutPage)

module.exports = router;