const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {  
  const sauceObjet = JSON.parse(req.body.sauce);
  delete sauceObjet._id;
      const sauces = new Sauce({
        ...sauceObjet,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      });
      sauce.save()
     .then(() => {               
         res.status(200).json({message:'objet enregistré !'});
        })
     .catch(error =>  res.status(400).json({ error }));
    next();
 };
 exports.getAllSauce = (req, res, next) =>{
         Sauce.find()
               .then(Sauces => res.status(200).json(Sauces))
               .catch(error => res.status(400).json({ error }));
               next();
 };
 exports.getOneSauce = (req, res, next) =>{
         Sauce.findOne({userId: req.params.id})
               .then(Sauce => res.status(200).json(Sauce))
               .catch(error => res.status(400).json({ error }));
               next();
 };
 exports.modifySauce = (req, res, next) =>{
   const saucesObjet =req.file?
   {
     ...JSON.parse(req.body.sauces),
     imageUrl:`${req.protocol}://${req.get('host')}/images/${req.body.file.filename}`
   }: { ...req.body};
            Sauce.updapteOne({userId: req.params.id}, {...req.body, _id: req.params.id})
               .then(() => res.status(200).json({message:'objet modifié'}))
               .catch(error => res.status(400).json({ error }));
               next();
   };
   exports.deleteSauce =(req, res, next) =>{
    Sauce.findOne({_id: req.params.id})
     .then(sauce =>{
       const filename = thing.imageUrl.split('/images/')[1];
       fs.unlick('images/${filename}', () =>{
        sauce.deleteOne({_id: req.params.id})
           .then(() => res.status(200).json({message:'objet supprimé'}))
           .catch(error => res.status(400).json({ error }));
       })
     })
     .catch(error => res.status(500).json({ error }));
   };