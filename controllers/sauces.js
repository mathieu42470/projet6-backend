const Sauce = require('../models/sauce');
const fs =require('fs');


exports.createSauce = (req, res, next) => {  
  const sauceObjet = JSON.parse(req.body.sauce);
  delete sauceObjet._id;
      const sauces = new Sauce({
        ...sauceObjet,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      });
      sauces.save()
     .then(() => {               
         res.status(200).json({message:'objet enregistré !'});
        })
     .catch(error =>  res.status(400).json({ error }));
 };
 exports.getAllSauce = (req, res, next) =>{
         Sauce.find()
               .then(Sauces => res.status(200).json(Sauces))
               .catch(error => res.status(400).json({ error }));
 };
 exports.getOneSauce = (req, res, next) =>{
         Sauce.findOne({ _id : req.params.id})
               .then(Sauce => res.status(200).json(Sauce))
               .catch(error => res.status(400).json({ error }));
 };
 exports.modifySauce = (req, res, next) =>{
   const saucesObjet = req.file?
   {
     ...JSON.parse(req.body.Sauce),
     imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   } : { ...req.body };
   Sauce.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id})
               .then(() => res.status(200).json({message:'objet modifié'}))
               .catch(error => res.status(400).json({ error }));
   };
   exports.deleteSauce = (req, res, next) =>{
    Sauce.findOne({ _id: req.params.id})
     .then(Sauce => {      
       const filename = Sauce.imageUrl.split('/images/')[1];
       fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
           .then(() => res.status(200).json({message:'objet supprimé'}))
           .catch(error => res.status(400).json({ error }));
       })
     })
     .catch(error => res.status(500).json({ error }));
   };