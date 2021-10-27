const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

 router.post('/', auth, multer, saucesCtrl.createThing);
 router.put('/:id', auth, saucesCtrl.modifyThing);
 router.delete('/:id', auth, saucesCtrl.deleteThing);
 router.use('/', auth, saucesCtrl.findAllThing);
 router.get('/:id', auth, saucesCtrl.findOneThing);  
            
module.exports = router;