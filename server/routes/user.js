const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

// Ajoute les routes utilisant la méthode GET
router.get('/:userId', auth, userCtrl.getUserData);

// Ajoute les routes utilisant la méthode POST
router.post('/:userId', auth, multer, userCtrl.setUserProfilePicture);

// Ajoute les routes utilisant la méthode DELETE
router.delete('/:userId', auth, userCtrl.deleteUser);

module.exports = router;