const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

 router.get('/', auth, saucesCtrl.getAllSauce);
 router.post('/', auth, multer, saucesCtrl.createSauce);
 router.put('/:id', auth, saucesCtrl.modifySauce);
 router.delete('/:id', auth, saucesCtrl.deleteSauce);
 router.get('/:id', auth, saucesCtrl.getOneSauce);  
            
module.exports = router;