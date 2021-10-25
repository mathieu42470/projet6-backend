const express = require('express');
const Thing = require('../models/things');

exports.createThing = (req, res, next) =>{
  const thingObjet = JSON.parse(req.body.thing);
  delete thingObjet._id;
               const thing = new Thing({
                 ...thingObjet,
                 imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
               })
               thing.save()
               .then(() => res.status(201).JSON({message:'objet enregistré !'}))
               .catch(error => res.status(400).JSON({error}));
 };
 exports.findAllThing = (req,res,next) =>{
               thing.find()
               .then(things => res.status(200).JSON(things))
               .catch(error => res.status(400).JSON({error}));
               next();
 };
 exports.findOneThing = (req, res,next) =>{
               Thing.findOne({userId: req.params.id})
               .then(things => res.status(200).JSON(things))
               .catch(error => res.status(400).JSON({error}));
 };
 exports.modifyThing = (req, res, next) =>{
   const thingObjet =req.file?
   {
     ...JSON.parse(req.body.thing),
     imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   }: { ...req.body};
               Thing.updapteOne({userId: req.params.id}, {...req.body, _id: req.params.id})
               .then(() => res.status(200).JSON({message:'objet modifié'}))
               .catch(error => res.status(400).JSON({error}));
   };
   exports.deleteThing =(req, res, next) =>{
     thing.findOne({_id: req.params.id})
     .then(thing =>{
       const filename = thing.imageUrl.split('/images/')[1];
       fs.unlick('images/${filename}', () =>{
         Thing.deleteOne({_id: req.params.id})
           .then(() => res.status(200).JSON({message:'objet supprimé'}))
           .catch(error => res.status(400).JSON({error}));
       })
     })
     .catch(error => res.status(500).JSON({error}));
   };