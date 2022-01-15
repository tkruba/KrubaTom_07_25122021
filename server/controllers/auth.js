const bcrypt = require('bcrypt');

const user = require('../models/user.model');


const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*.?])(?=.*[0-9])(?=.*[a-z]).{7,15}/u;

exports.login = async (req, res, next) => {
    if (!req.body.email || !req.body.password) return res.status(400).json({error: "JSON invalide."});

    if (!emailRegex.test(req.body.email)) return res.status(415).json({error: "Adresse e-mail invalide."});

    if (await !user.isRegistered(req.body.email)) return res.status(500).json({error: "Utilisateur non trouvée."});

    if (await !user.areCredentialsValid(req.body.email, req.body.password)) return res.status(500).json({error: "Mot de passe erroné."});
    res.status(200).json({
        message: "Connexion réussie."
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
    if (await user.isRegistered(req.body.email)) return res.status(500).json({ error: 'Email déjà enregistrée.' });

    // Hash le mot de passe et enregistre l'utilisateur dans la BDD.
    bcrypt.hash(req.body.password, 10).then(hash => {
        user.register([req.body.firstname, req.body.surname, req.body.email, hash]);
        res.status(200).json({ message: "Enregistrement réussi." });
    }).catch(error => {
        res.status(500).json({error});
    });
}
