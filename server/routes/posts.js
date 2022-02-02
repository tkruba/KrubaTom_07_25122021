const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/posts');

// Ajoute les routes utilisant la méthode GET
router.get('/', auth, postsCtrl.getAllPosts);
router.get('/:postId', auth, postsCtrl.getPost);
router.get('/user/:userId', auth, postsCtrl.getUserPosts);

// Ajoute les routes utilisant la méthode POST
router.post('/', auth, multer, postsCtrl.createPost);

// Ajoute les routes utilisant la méthode DELETE
router.delete('/:postId', auth, postsCtrl.deletePost);

module.exports = router;