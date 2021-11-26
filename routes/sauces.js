const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// routes pour les sauces //
 router.get('/', auth, saucesCtrl.getAllSauce);
 router.post('/', auth, multer, saucesCtrl.createSauce);
 router.get('/:id', auth, saucesCtrl.getOneSauce);  
 router.put('/:id', auth, multer, saucesCtrl.modifySauce);
 router.delete('/:id', auth, multer, saucesCtrl.deleteSauce);
 router.post('/:id/like', auth, saucesCtrl.likeSauce);
 
module.exports = router;