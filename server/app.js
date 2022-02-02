const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const commentsRoutes = require('./routes/comments');

// Définie les controles d'accès pour les requêtes du serveur
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_HOST + ':' + process.env.CLIENT_PORT);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Définie le chemin des routes
app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);
app.use('/user', userRoutes);
app.use('/comments', commentsRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
