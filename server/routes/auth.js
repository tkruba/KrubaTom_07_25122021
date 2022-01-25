const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const authCtrl = require('../controllers/auth');

router.get('/logout', auth, authCtrl.logout);

router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);

module.exports = router;