const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('../models/user.model');

// Définie des Expressions Régulières
const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*.?])(?=.*[0-9])(?=.*[a-z]).{7,15}/u;


// Gère la connexion de l'utilisateur
exports.login = async (req, res, next) => {

    let refreshCookie = req.cookies.groupomaniaRefreshToken;
    // Vérifie l'existance d'un cookie de rafraichissement 'groupomaniaRefreshToken'
    if (refreshCookie) return jwt.verify(refreshCookie, process.env.JWT_REFRESH_TOKEN, async (err, token) => {
        if (err) return res.clearCookie('groupomaniaAccessToken').clearCookie('groupomaniaRefreshToken').status(401);

        // Vérifie que l'utilisateur indiqué par le cookie existe
        if (!await users.isRegistered(token.user.email)) return res.clearCookie('groupomaniaAccessToken').clearCookie('groupomaniaRefreshToken').status(500);
        
        // Créer un cookie d'accès et authentifie rapidement l'utilisateur du cookie
        const accessToken = jwt.sign({ user: token.user }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15m' });
        res.cookie('groupomaniaAccessToken', accessToken, { path: '/', overwrite: true, httpOnly: true, maxAge: 15 * 60 * 1000 }); // 15m

        res.status(200).json({
            message: 'Connexion à groupomania.',
            user: token.user
        });
    });

    // Vérifie l'intégrité de la requête
    if (!req.body.email || !req.body.password) return res.status(400).json({ error: "JSON invalide." });

    // Vérifie l'intégrité de l'adresse e-mail indiquée
    if (!emailRegex.test(req.body.email)) return res.status(415).json({ error: "Adresse e-mail invalide." });

    // Vérifie que l'utilisateur lié à cette adresse e-mail existe
    if (!await users.isRegistered(req.body.email)) return res.status(500).json({ error: "Utilisateur non trouvée." });        

    // Vérifie que le mot de passe de l'utilisateur est le bon
    if (!await users.areCredentialsValid(req.body.email, req.body.password)) return res.status(500).json({ error: "Mot de passe erroné." });

    let user = await users.getUser(req.body.email);
    delete user.password;

    // Retourne un cookie d'autentification et de rafraichissement au client.
    let accessToken = jwt.sign({ user }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15m' }); // 15 Minutes
    let refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '7d' }); // 7 Jours
    res.cookie('groupomaniaAccessToken', accessToken, { path: '/', httpOnly: true, maxAge: 15 * 60 * 1000 }).cookie('groupomaniaRefreshToken', refreshToken, { path: '/', httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7d

    return res.status(200).json({
        message: 'Connexion à groupomania.',
        user
    });
}

// Gère l'enregistrement d'un nouvel utilisateur
exports.register = async (req, res, next) => {

    // Vérifie l'intégrité de la requête
    if (!req.body.firstname ||
        !req.body.surname ||
        !req.body.email ||
        !req.body.password ||
        !req.body.passwordConfirm) return res.status(400).json({ error: 'JSON invalide.' });

    // Vérifie l'intégrité des données fournies (Nom, Prénom et Adresse e-mail)
    if (!nameRegex.test(req.body.firstname) ||
        !nameRegex.test(req.body.surname) ||
        !emailRegex.test(req.body.email)) return res.status(415).json({ error: 'Données JSON non conforme.' });

    // Vérifie l'intégrité du mot de passe fournis ainsi que sa confirmation
    if (!passwordRegex.test(req.body.password) ||
        req.body.passwordConfirm !== req.body.password) return res.status(415).json({ error: 'Données de Mot de passe non conforme' });

    // Vérifie que l'adresse e-mail fournie n'est pas déjà enregistrée
    if (await users.isRegistered(req.body.email)) return res.status(500).json({ error: 'Email déjà enregistrée.' });

    // Hash le mot de passe et enregistre l'utilisateur dans la BDD.
    bcrypt.hash(req.body.password, 10).then(hash => {
        users.register([req.body.firstname, req.body.surname, req.body.email, hash]);
        res.status(200).json({ message: "Enregistrement réussi." });
    }).catch(error => {
        res.status(500).json({ error });
    });
}

// Gère le rafraichissement du cookie d'accès
exports.refreshAccessToken = async (req, res) => {

    let refreshCookie = req.cookies.groupomaniaRefreshToken;
    // Vérifie l'existance d'un cookie de rafraichissement 'groupomaniaRefreshToken'
    if (refreshCookie) return jwt.verify(refreshCookie, process.env.JWT_REFRESH_TOKEN, async (err, token) => {
        if (err) return res.status(401);

        // Vérifie que l'utilisateur indiqué par le cookie existe
        if (!await users.isRegistered(token.user.email)) return res.clearCookie('groupomaniaAccessToken').clearCookie('groupomaniaRefreshToken').status(500);
        
        // Retourne un cookie d'autentification au client.
        const accessToken = jwt.sign({ user: token.user }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15m' });
        res.cookie('groupomaniaAccessToken', accessToken, { path: '/', overwrite: true, httpOnly: true, maxAge: 15 * 60 * 1000 }); // 15m
        res.status(200);
    });
}

// Gère la deconnexion de l'utilisateur
exports.logout = async (req, res, next) => {

    // Supprime les cookies d'accès et de rafraichissement de l'utilisateur
    res.clearCookie('groupomaniaAccessToken').clearCookie('groupomaniaRefreshToken');
    return res.status(200).json({message: 'Deconnexion réussie'});
}