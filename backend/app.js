// Importation des modules utilisés
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require("helmet");

// Importation des routes
const publicationsRoutes = require('./routes/publications');
const userRoutes = require('./routes/user');

// Création de l'application Express
const app = express();

// Définition du Cross-Origin Ressource Sharing
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());

// Transforme le corps de la requête en JSON
app.use(bodyParser.json());

// Définition du chemin des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Définition des paramètres demandés par l'API
app.use('/api/publications', publicationsRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;