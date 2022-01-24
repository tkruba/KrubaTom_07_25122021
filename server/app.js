const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
/*
const commentsRoutes = require('./routes/comments');
const profileRoutes = require('./routes/profile');
*/

// Définie les controlles d'accès pour les requetes du serveur
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);
/*
app.use('/comments', commentsRoutes);
app.use('/profile', profileRoutes);
*/

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
