const express = require('express');
const router = express.Router();
const Thing = require('../models/things');
const saucesCtrl = require('../controllers/sauces');

 router.post('/', saucesCtrl.createThing);
 router.put('/:id', saucesCtrl.modifyThing);
 router.delete('/:id', saucesCtrl.deleteThing);
 router.use('/', saucesCtrl.findAllThing);
 router.get('/:id', saucesCtrl.findOneThing);             
 
module.exports = router;