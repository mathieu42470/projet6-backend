const express = require('express');
const multer = require('multer');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.use('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;