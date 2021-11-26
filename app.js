const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors');
const helmet = require("helmet");

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// récupération et connexion au serveur MongoDB //
mongoose.connect('mongodb+srv://mathieu42470:Mat25tar1191@cluster0.zyes8.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(helmet());
app.use(bodyParser.json());
const corsOption ={
  origin: '*',
};
app.use(cors(corsOption));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);

app.use('/api/auth', userRoutes);
module.exports = app;
