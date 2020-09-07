// Importation d'Express
const express = require('express');

// Création du routeur
const router = express.Router();

// Protection des routes
const auth = require('../middleware/auth');

// Gestion des fichiers
const multer = require('../middleware/multer-config');

// Importation du routeur
const publicationCtrl = require('../controllers/publications')

// Routes pour chaque fonction
router.post('/', auth, multer, publicationCtrl.createPublication);
router.put('/:id', auth, multer, publicationCtrl.modifyPublication);
router.delete('/:id', auth, publicationCtrl.deletePublication);
router.get('/', auth, publicationCtrl.getAllPublications);

module.exports = router;