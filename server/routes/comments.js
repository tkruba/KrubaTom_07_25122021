const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentsCtrl = require('../controllers/comments');

// Ajoute les routes utilisant la méthode GET
router.get('/:postId', auth, commentsCtrl.getComments);

// Ajoute les routes utilisant la méthode POST
router.post('/:postId', auth, commentsCtrl.addNewComment);

// Ajoute les routes utilisant la méthode DELETE
router.delete('/:commentId', auth, commentsCtrl.deleteComment);

module.exports = router;