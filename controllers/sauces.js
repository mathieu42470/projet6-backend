const Sauce = require('../models/sauce');
const fs =require('fs');

// création de sauce //
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
     .catch(error => res.status(400).json({ error }));
 };
 // récupération de toutes les sauces //
 exports.getAllSauce = (req, res, next) =>{
         Sauce.find()
               .then(Sauces => res.status(200).json(Sauces))
               .catch(error => res.status(400).json({ error }));
 };
 // récupération d'une sauce avec l'id //
 exports.getOneSauce = (req, res, next) =>{
         Sauce.findOne({ _id : req.params.id})
               .then(Sauce => res.status(200).json(Sauce))
               .catch(error => res.status(400).json({ error }));
 };
 // modification d'une sauce avec authentification //
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
   // suppression d'une sauce avec authentification //
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
// like et dislike de sauce avec récupération de l'id utilisateur //
   exports.likeSauce = (req, res, next) =>{
    const likes = req.body.like;
    const userId = req.body.userId;
    const sauceId = req.params.id;
    let result = "";
    Sauce.findOne({ _id: sauceId})
    .then(Sauce =>{
    switch(likes){
      case 0:
      // Supprimer le user dans les tableaux dislikes et likes      
        if(Sauce.usersLiked.indexOf(userId)!= -1){
          Sauce.usersLiked.splice(Sauce.usersLiked.indexOf(userId), 1);
          Sauce.likes -= 1
        }else if(Sauce.usersDisliked.indexOf(userId)!= -1){
          Sauce.usersDisliked.splice(Sauce.usersDisliked.indexOf(userId), 1);
          Sauce.dislikes -= 1
        }
        result = "0";
         break;
      case 1:
      // Ajouter l'utilisateur dans le tableau like s'il n'existe pas
      Sauce.usersLiked.push(userId)
      Sauce.likes = +1;
      result = "1";
        break;
      case -1:
        // Ajouter l'utilisateur dans le tableau dislike s'il n'existe pas
        Sauce.usersDisliked.push(userId)
        Sauce.dislikes = +1;
        result = "-1";
        break;
      default:
          throw 'Le parametre n est pas bon';
    }
    Sauce.save();
  })
  .then(() =>{     
    res.status(200).json({message:result})});
   };

   