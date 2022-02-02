const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const authCtrl = require('../controllers/auth');

// Ajoute les routes utilisant la méthode GET
router.get('/logout', auth, authCtrl.logout);
router.get('/refresh', authCtrl.refreshAccessToken);

// Ajoute les routes utilisant la méthode POST
router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);

module.exports = router;