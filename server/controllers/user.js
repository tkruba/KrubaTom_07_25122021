const users = require('../models/user.model');
const posts = require('../models/posts.model');
const comments = require('../models/comments.model');

const fs = require('fs');


// Récupère les informations d'un utilisateur spécifique via son ID
exports.getUserData = async (req, res, next) => {

    let user = await users.getUserById(req.params.userId);

    // Vérifie que l'utilisateur existe
    if (!user) return res.status(500).json({ error: "Utilisateur non trouvé." });

    // Ajoute l'url à l'image de profil
    user.pictureUrl = `${req.protocol}://${req.get('host')}/images/` + user.pictureUrl;

    // Supprime le mot de passe de l'objet utilisateur
    delete user.password;

    return res.status(200).json({
        user
    });
};

// Ajoute une nouvelle image de profile pour l'utilisateur 
exports.setUserProfilePicture = async (req, res, next) => {

    // Vérifie si une image est bien fournie
    if (!req.file) return res.status(400).json({ error: 'Aucune image fournie.' });

    // Vérifie si l'utilisateur actif a les droits
    if (!req.params.userId === req.user.id) return res.status(401).json({ error: 'Requête non autorisée.' });

    //  Supprime l'ancienne image de profil si elle n'est pas celle par défaut
    let user = await users.getUserById(req.user.id);
    if (user.pictureUrl !== 'user-default.png') fs.unlink(`images/${user.pictureUrl}`, (err) => {
    });

    // Renomme la nouvelle image de profil
    let image = 'user' + req.user.id + '.' + req.file.filename.split('.')[1];
    fs.renameSync(req.file.path, './' + req.file.destination + '/' + image);

    // Définie la nouvelle image de profil dans la base de donnée
    users.setUserProfilePicture([image, req.user.id]);
    return res.status(200).json({ message: 'Image de profile mise à jour.' });
};

// Supprime un utilisateur spécifique via son ID ainsi ses informations (Posts & Commentaires)
exports.deleteUser = async (req, res, next) => {

    let user = await users.getUserById(req.params.userId);

    // Vérifie si l'utilisateur a supprimer existe
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });

    // Vérifie si l'utilisateur actif a les droits
    if (!req.user.id === req.params.userId || !users.isUserAdmin(req.user.id)) return res.status(401).json({ error: 'Requête non autorisée.' });

    // Supprime les commentaires de l'utilisateur
    comments.deleteUserComments(req.params.userId);

    // Supprime les posts de l'utilisateur
    let userPosts = await posts.getUserPosts(req.params.userId);
    userPosts.forEach(post => {
        if (post.imageUrl) fs.unlink(`images/${post.imageUrl}`, (err) => {
        });
        comments.deleteAllComments(post.id);
    });
    posts.deletePostFromUser(req.params.userId);

    // Supprime l'image de profil l'utilisateur
    if (user.pictureUrl !== 'user-default.png') fs.unlink(`images/${user.pictureUrl}`, (err) => {
    });

    // Supprime l'utilisateur de la base de donnée
    users.deleteUser(req.params.userId);

    // Deconnecte l'utilisateur actif si il a demandé la suppression de SON compte
    if (req.user.id === parseInt(req.params.userId)) {
        res.clearCookie('groupomaniaAccessToken').clearCookie('groupomaniaRefreshToken');
        return res.status(200).json({ message: 'Utilisateur supprimé.', logout: true });
    } else {
        return res.status(200).json({ message: 'Utilisateur supprimé.', logout: false });
    }
};