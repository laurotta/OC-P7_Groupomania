const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

// Limitation du nombre de requêtes
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 5, // 5 requêtes
    message: {
        message: 'Trop de requêtes : réessayez ultérieurement.'
    }
});

router.post('/signup', userCtrl.signup);
router.post('/signin', limiter, userCtrl.signin);
router.get('/logged', auth, userCtrl.userData);
router.delete('/delete', auth, userCtrl.unsubscribeUser);

module.exports = router;