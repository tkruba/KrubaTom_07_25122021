const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentsCtrl = require('../controllers/comments');

router.get('/:postId', auth, commentsCtrl.getComments);

router.post('/:postId', auth, commentsCtrl.addNewComment);

router.delete('/:id', auth, commentsCtrl.deleteComment);

module.exports = router;