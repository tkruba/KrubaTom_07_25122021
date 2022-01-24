const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('../models/user.model');


const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*.?])(?=.*[0-9])(?=.*[a-z]).{7,15}/u;

exports.login = async (req, res, next) => {

    // console.log(req.cookies.groupomaniaRefreshToken);

    let refreshCookie = req.cookies.groupomaniaRefreshToken;
    if (refreshCookie) return jwt.verify(refreshCookie, process.env.JWT_REFRESH_TOKEN, async (err, token) => {
        // console.log(token.user);
        if (err) return res.status(401);

        if (await !users.isRegistered(token.user.email)) return res.clearCookie('groupomaniaAccessToken').clearCookie('groupomaniaRefreshToken').status(500);
        const accessToken = jwt.sign({ user: token.user }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15m' });
        res.cookie('groupomaniaAccessToken', accessToken, { path: '/', overwrite: true, httpOnly: true, maxAge: 15 * 60 * 1000 }); // 15m
        res.status(200).json({
            message: 'Connexion à groupomania.',
            user: token.user
        });
    });

    // Si email, et password ne sont pas présent: retourne une erreur. Sinon continue.
    if (!req.body.email || !req.body.password) return res.status(400).json({ error: "JSON invalide." });

    // Si regex non valide: retourne une erreur. Sinon continue.
    if (!emailRegex.test(req.body.email)) return res.status(415).json({ error: "Adresse e-mail invalide." });

    // Si email non enregistrée: retourne une erreur. Sinon continue.
    if (await !users.isRegistered(req.body.email)) return res.status(500).json({ error: "Utilisateur non trouvée." });

    // Si informations de connexion !== base de données: retourne une erreur. Sinon continue.
    if (await !users.areCredentialsValid(req.body.email, req.body.password)) return res.status(500).json({ error: "Mot de passe erroné." });

    let user = await users.getUser(req.body.email);
    delete user.password;

    // Retourne un token d'autentification au client.

    // UTILISER COOKIE HTTP-ONLY A LA PLACE (SECURITÉ)
    let accessToken = jwt.sign({ user }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15m' });
    let refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '7d' });
    // 15m
    res.cookie('groupomaniaAccessToken', accessToken, { path: '/', httpOnly: true, maxAge: 15 * 60 * 1000 }).cookie('groupomaniaRefreshToken', refreshToken, { path: '/', httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7d

    return res.status(200).json({
        message: 'Connexion à groupomania.',
        user
    });
}

exports.register = async (req, res, next) => {

    // Si firstname, surname, email, password et passwordconfirm ne sont pas présent: retourne une erreur. Sinon continue.
    if (!req.body.firstname ||
        !req.body.surname ||
        !req.body.email ||
        !req.body.password ||
        !req.body.passwordConfirm) return res.status(400).json({ error: 'JSON invalide.' });

    // Si regex non valide: retourne une erreur. Sinon continue.
    if (!nameRegex.test(req.body.firstname) ||
        !nameRegex.test(req.body.surname) ||
        !emailRegex.test(req.body.email)) return res.status(415).json({ error: 'Données JSON non conforme.' });

    // Si regex password et passwordConfirm !== password: retourne une erreur. Sinon continue.
    if (!passwordRegex.test(req.body.password) ||
        req.body.passwordConfirm !== req.body.password) return res.status(415).json({ error: 'Données de Mot de passe non conforme' });

    // Si email déjà enregistrée: retourne une erreur. Sinon continue.
    if (users.isRegistered(req.body.email)) return res.status(500).json({ error: 'Email déjà enregistrée.' });

    // Hash le mot de passe et enregistre l'utilisateur dans la BDD.
    bcrypt.hash(req.body.password, 10).then(hash => {
        users.register([req.body.firstname, req.body.surname, req.body.email, hash]);
        res.status(200).json({ message: "Enregistrement réussi." });
    }).catch(error => {
        res.status(500).json({ error });
    });
}

exports.refreshAccessToken = async (req, res) => {

    let refreshCookie = req.cookies.groupomaniaRefreshToken;
    if (refreshCookie) return jwt.verify(refreshCookie, process.env.JWT_REFRESH_TOKEN, async (err, token) => {
        // console.log(token.user);
        if (err) return res.status(401);

        if (await !users.isRegistered(token.user.email)) return res.clearCookie('groupomaniaAccessToken').clearCookie('groupomaniaRefreshToken').status(500);
        const accessToken = jwt.sign({ user: token.user }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15m' });
        res.cookie('groupomaniaAccessToken', accessToken, { path: '/', overwrite: true, httpOnly: true, maxAge: 15 * 60 * 1000 }); // 15m
        res.status(200);
    });
}