const express = require('express');
const router = express.Router();
const Thing = require('../models/things');
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

 router.use('/', auth, multer, saucesCtrl.createThing);
 router.put('/:id', auth, saucesCtrl.modifyThing);
 router.delete('/:id', auth, saucesCtrl.deleteThing);
 router.use('/', auth, saucesCtrl.findAllThing);
 router.get('/:id', auth, saucesCtrl.findOneThing);             
 
module.exports = router;