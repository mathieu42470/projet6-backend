const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const thing = require('./models/things');
const saucesRouter = require('./routes/sauces');

mongoose.connect('mongodb+srv://mathieu42470:<Mat08tar031966>@cluster0.zyes8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use((req, res, next) =>{
               res.setHeader('Access-Control-Allow-Origin', '*');
               res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
               res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
               next();
});
app.use(bodyParser.json());
app.use('/api/sauces', saucesRouter);



module.exports = app;
