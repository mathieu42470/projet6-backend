const Thing = require('../models/things');

exports.createThing = (req, res, next) =>{
               const thing = new Thing({
                 ...req.body
               })
               thing.save()
               .then(() => res.status(201).json({message:'objet enregistré !'}))
               .catch(error => res.status(400).json({error}));
 };
 exports.findAllThing = (req,res,next) =>{
               thing.find()
               .then(things => res.status(200).json(things))
               .catch(error => res.status(400).json({error}));
               next();
 };
 exports.findOneThing = (req, res,next) =>{
               Thing.findOne({userId: req.params.id})
               .then(things => res.status(200).json(things))
               .catch(error => res.status(400).json({error}));
 };
 exports.modifyThing = (req, res, next) =>{
               Thing.updapteOne({userId: req.params.id}, {...req.body, _id: req.params.id})
               .then(() => res.status(200).json({message:'objet modifié'}))
               .catch(error => res.status(400).json({error}));
   };
   exports.deleteThing =(req, res, next) =>{
               Thing.deleteOne({userId: req.params.id})
               .then(things => res.status(200).json({message:'objet supprimé'}))
               .catch(error => res.status(400).json({error}));
};