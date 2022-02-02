const jwt = require('jsonwebtoken');

const users = require('../models/user.model');

module.exports = (req, res, next) => {

    let accessToken = req.cookies.groupomaniaAccessToken;

    // Vérifie le cookie d'accès
    if (accessToken) jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, async (err, token) => {
        if (err) return res.status(401).json({ error: 'Unauthenticated user.', issue: err });
        
        // Vérifie que l'utilisateur lié au cookie d'accès existe
        if (await !users.isRegistered(token.user.email)) return res.status(401).json({ error: 'User not found' });
        req.user = token.user;
        
        next();
    });
}