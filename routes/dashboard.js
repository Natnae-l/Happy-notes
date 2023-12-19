const express = require('express');
const dashboardController = require('../controllers/dashboardController')
const checkAuth = require('../auth/checkAuth')

const router = express.Router();


router.get('/dashboard',checkAuth, dashboardController.dashboard)




module.exports = router;