const express = require('express')
const path = require('path')

const app = express()
// Définie les controlles d'accès pour les requetes du serveur
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
})

app.get('', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})
module.exports = app
