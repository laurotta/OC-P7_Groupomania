const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.signin);
router.get('/logged', auth, userCtrl.userData);
router.delete('/delete', auth, userCtrl.unsubscribeUser);  

module.exports = router;