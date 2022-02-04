const posts = require('../models/posts.model');
const users = require('../models/user.model');
const comments = require('../models/comments.model');

const fs = require('fs');


// Création d'un post
exports.createPost = async (req, res, next) => {

    // Vérifie l'intégrité de la requête
    if (!req.body.post) return res.status(400).json({ error: "JSON invalide." });

    let post = JSON.parse(req.body.post);
    // Vérifie le contenu de la requête
    if (!post.message && !req.file) return res.status(415).json({ error: "Contenu du post vide." });

    let image = null

    // Renomme l'image si il y'en a une
    if (req.file) {
        image = 'post' + await posts.getNextPostId() + '.' + req.file.filename.split('.')[1];
        fs.renameSync(req.file.path, './' + req.file.destination + '/' + image);
    }

    // Défini le message comme null si celui-ci vide
    if (post.message === '') post.message = null;

    // Ajoute le post à la base de donnée
    posts.addNewPost([req.user.id, post.message, image]);
    return res.status(200).json({ message: 'Post crée.' })
};

// Récupère tous les posts
exports.getAllPosts = async (req, res, next) => {

    let post = await posts.getAllPosts();

    // Ajoute l'url aux images
    post.forEach((element) => {
        if (element.imageUrl) element.imageUrl = `${req.protocol}://${req.get('host')}/images/` + element.imageUrl;
        if (element.pictureUrl) element.pictureUrl = `${req.protocol}://${req.get('host')}/images/` + element.pictureUrl;
    });

    return res.status(200).json({
        posts: post,
        message: 'Posts récupérés.'
    });
};

// Récupère un post spécifique via son ID
exports.getPost = async (req, res, next) => {

    let post = await posts.getPost(req.params.postId);

    // Vérifie que le post existe
    if (!post) return res.status(404).json({ error: 'Post non trouvé.' });

    // Ajoute l'url aux images
    if (post.imageUrl) post.imageUrl = `${req.protocol}://${req.get('host')}/images/` + post.imageUrl;
    if (post.pictureUrl) post.pictureUrl = `${req.protocol}://${req.get('host')}/images/` + post.pictureUrl;

    return res.status(200).json({
        post: post,
        message: 'Post récupéré avec succès.'
    });
};

// Récupère les posts d'un utilisateur spécifique via son ID
exports.getUserPosts = async (req, res, next) => {

    let post = await posts.getUserPosts(req.params.userId);

    // Vérifie que l'utilisateur demandé existe
    if (!post) return res.status(403).json({ error: 'Aucun post trouvé pour l\'utilisateur suivant: userId=' + req.params.userId });

    // Ajoute l'url aux images
    post.forEach(element => {
        if (element.imageUrl) element.imageUrl = `${req.protocol}://${req.get('host')}/images/` + element.imageUrl;
        if (element.pictureUrl) element.pictureUrl = `${req.protocol}://${req.get('host')}/images/` + element.pictureUrl;
    });

    return res.status(200).json({
        posts: post,
        message: 'Posts récupérés avec succès'
    });
};

// Supprime un post spécifique via son ID
exports.deletePost = async (req, res, next) => {

    let post = await posts.getPost(req.params.postId);

    // Vérifie que le post existe
    if (!post) return res.status(404).json({ error: 'Post non trouvé.' });

    // Vérifie que l'auteur de la requête a les permissions
    if (!req.user.id === post.posterId || !users.isUserAdmin(req.user.id)) return res.status(401).json({ error: 'Requête non autorisée.' });

    // Supprime l'image du post si il y'en a une
    const filename = post.imageUrl;
    if (filename) fs.unlink(`images/${filename}`, (err) => {
        console.log(err);
    });

    // Supprime le post
    comments.deleteAllComments(req.params.postId);
    posts.deletePost(req.params.postId);

    return res.status(200).json({
        message: 'Post suprimé avec succès.'
    });
};