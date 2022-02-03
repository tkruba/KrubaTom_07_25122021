const comments = require('../models/comments.model');
const posts = require('../models/posts.model');
const users = require('../models/user.model');

// Récupère les commentaires d'un poste spécifique
exports.getComments = async (req, res, next) => {

    // Vérifie que le poste existe
    if (!await posts.getPost(req.params.postId)) return res.status(404).json({ error: "Post non trouvé." });

    let coms = await comments.getComments(req.params.postId);

    // Ajoute les url aux images
    coms.forEach(comment => {
        comment.pictureUrl = `${req.protocol}://${req.get('host')}/images/` + comment.pictureUrl;
    });
    
    return res.status(200).json({ comments: coms });
}

// Ajoute un nouveau commentaire sur un poste spécifique
exports.addNewComment = async (req, res, next) => {

    // Vérifie que la requête est valide
    if (!req.body.comment) return res.status(400).json({ error: "JSON Invalide." });

    // Vérifie que le poste existe
    if (!await posts.getPost(req.params.postId)) return res.status(404).json({ error: "Post non trouvé." });

    // Ajoute le nouveau commentaire
    await comments.addNewComment([req.params.postId, req.user.id, req.body.comment]);

    return res.status(200).json({ message: 'Commentaire ajouté avec succès.'});

}

// Supprime un commentaire spécifique
exports.deleteComment = async (req, res, next) => {

    // Vérifie que le commentaire existe
    let comm = await comments.getComment(req.params.commentId);
    if (!comm) return res.status(404).json({ error: 'Commentaire non trouvé.' });
    
    // Vérifie que l'utilisateur a les permissions
    if (!users.isUserAdmin(req.user.id) || !req.user.id === comm.posterId) return res.status(401).json({ error: 'Requête non autorisée.' });

    // Supprime le commentaire
    await comments.deleteComment(req.params.commentId);

    return res.status(200).json({ message: 'Commentaire supprimé avec succès.' });
}