const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

 router.get('/', auth, saucesCtrl.getAllSauce);
 router.post('/', auth, multer, saucesCtrl.createSauce);
 router.get('/:id', auth, saucesCtrl.getOneSauce);  
 router.put('/:id', auth, multer, saucesCtrl.modifySauce);
 router.delete('/:id', auth, multer, saucesCtrl.deleteSauce);
 router.post('/:id/like', saucesCtrl.likeSauce);
 router.post('/:id/like', saucesCtrl.dislikesSauce);
//  router.post('/:id/like', saucesCtrl.userIdLikes);  
//  router.post('/:id/like', saucesCtrl.userIdDislikes)

module.exports = router;