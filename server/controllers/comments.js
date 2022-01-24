const comments = require('../models/comment.model');
const posts = require('../models/posts.model');
const users = require('../models/user.model');

exports.getComments = async (req, res, next) => {

    if (!req.body.postId) return res.status(400).json({ error: 'JSON Invalide.' });
    if (await !posts.getPost(req.body.postId)) return res.status(404).json({ error: "Post non trouvé." });

    let coms = comments.getComments(req.body.postId);
    return res.status(200).json({ comments: coms });
}

exports.addNewComment = async (req, res, next) => {

    if (!req.body.comment || !req.body.postId) return res.status(400).json({ error: "JSON Invalide." });

    if (await !posts.getPost(req.body.postId)) return res.status(404).json({ error: "Post non trouvé." });

    comments.addNewComment([req.body.postId, req.user.id, req.body.comment]);

    return res.status(200).json({ message: 'Commentaire ajouté avec succès.'});

}

exports.deleteComment = (req, res, next) => {
    if (!req.body.commentId) return res.status(400).json({ error: 'JSON Invalide.' });
    if (!comments.getComment(req.body.commentId)) return res.status(404).json({ error: 'Commentaire non trouvé.' });
    if (!users.isUserAdmin(req.user.id) || !req.user.id === req.body.posterId) return res.status(401).json({ error: 'Requête non autorisée.' });

    comments.deleteComment(req.body.commentId);

    return res.status(200).json({ message: 'Commentaire suprimé avec succès.' });
}