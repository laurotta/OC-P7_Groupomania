const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const publicationCtrl = require('../controllers/publications')

router.post('/addPublication', auth, multer, publicationCtrl.addPublication);
//router.put('/:id', auth, multer, publicationCtrl.modifyPublication);
router.delete('/:id', auth, publicationCtrl.destroyPublication);
router.get('/', auth, publicationCtrl.getAllPublications);

module.exports = router;