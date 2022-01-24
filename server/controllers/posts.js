const comments = require('../models/comments.model');
const posts = require('../models/posts.model');
const users = require('../models/user.model');

const fs = require('fs');

exports.createPost = async (req, res, next) => {
    
    if (!req.body.post) return res.status(400).json({ error: "JSON invalide."});

    let post = JSON.parse(req.body.post);
    if (!post.message && !req.file) return res.status(415).json({ error: "Contenu du post vide."});

    let image = null
    if (req.file) {
        image = 'post' + await posts.getNextPostId() + '.' + req.file.filename.split('.')[1];
        fs.renameSync(req.file.path, './' + req.file.destination + '/' + image);
    }

    posts.addNewPost([req.user.id, post.message, image]);
    return res.status(200).json({ message: 'Post crée.'})
}

exports.getAllPosts = async (req, res, next) => {

    let post = await posts.getAllPosts();

    // console.log(post);

    post.forEach(element => {
        if (element.imageUrl) element.imageUrl = `${req.protocol}://${req.get('host')}/images/` + element.imageUrl;
        if (element.pictureUrl) element.pictureUrl = `${req.protocol}://${req.get('host')}/images/` + element.pictureUrl;
    });

    return res.status(200).json({
        posts: post,
        message: 'Posts récupérés.'
    });
}

exports.getPost = (req, res, next) => {
    let post = posts.getPost(req.body.postId);

    if (!post) return res.status(404).json({ error: 'Post non trouvé.' });

    post.forEach(element => {
        if (element.imageUrl) element.imageUrl = `${req.protocol}://${req.get('host')}/images/` + element.imageUrl;
        if (element.pictureUrl) element.pictureUrl = `${req.protocol}://${req.get('host')}/images/` + element.pictureUrl;
    });

    return res.status(200).json({
        post: post,
        message: 'Post récupéré avec succès.'
    });
}

exports.getUserPosts = (req, res, next) => {
    let post = posts.getUserPosts(req.user.id);
    
    if (!post) return res.status(403).json({ error: 'Aucun post trouvé pour l\'utilisateur suivant: userId=' + req.user.id});
    
    post.forEach(element => {
        if (element.imageUrl) element.imageUrl = `${req.protocol}://${req.get('host')}/images/` + element.imageUrl;
        if (element.pictureUrl) element.pictureUrl = `${req.protocol}://${req.get('host')}/images/` + element.pictureUrl;
    });

    return res.status(200).json({
        posts: post,
        message: 'Posts récupérés avec succès'
    });
}

exports.deletePost = (req, res, next) => {
    let post = posts.getPost(req.body.postId);

    if (!post) return res.status(404).json({ error: 'Post non trouvé.' });

    if (!req.user.id === post.posterId || !users.isAdmin(req.user.id)) return res.status(401).json({ error: 'Requête non autorisée.' });
    
    const filename = post.imageUrl;
    if (filename) fs.unlink(`images/${filename}`);
    
    posts.deletePost(req.body.postId);
    comments.deleteAllComments(req.body.postId);

    return res.status(200).json({
        message: 'Post suprimé avec succès.'
    });
}