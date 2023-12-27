const express = require('express');
const dashboardController = require('../controllers/dashboardController')
const checkAuth = require('../auth/checkAuth')

const router = express.Router();


router.get('/dashboard',checkAuth, dashboardController.dashboard)
router.get('/dashboard/item/:id', checkAuth, dashboardController.showNotes)
router.post('/dashboard/item/:id', checkAuth, dashboardController.updateNotes)
router.delete('/note/:id', checkAuth, dashboardController.deleteNote)


module.exports = router;