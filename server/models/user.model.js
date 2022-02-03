pool = require('../utils/database');
const bcrypt = require('bcrypt');

module.exports = {

    // Vérifie si l'adresse e-mail est déjà enregistrée
    async isRegistered(email) {
        try {
            conn = await pool.getConnection();
            query = "SELECT email FROM users WHERE email = ?";
            const rows = await conn.query(query, email);
            conn.end();
            return (rows.length == 1) ? true : false;
        } catch (err) {
            throw err;
        }
    },

    // Enregistre un utilisateur
    async register(data) {
        try {
            conn = await pool.getConnection();
            query = "INSERT INTO users (firstname, surname, email, password) VALUES (?, ?, ?, ?)";
            const rows = await conn.batch(query, [data]);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    },

    // Compare le mot de passe fournis avec celui enregistré
    async areCredentialsValid(email, password) {
        try {
            conn = await pool.getConnection();
            query = "SELECT password FROM users WHERE email = ?";
            const rows = await conn.query(query, email);
            conn.end();
            return (await bcrypt.compare(password, rows[0].password)) ? true : false;
        } catch (err) {
            throw err;
        }
    },

    // Récupère les données d'un utilisateur spécifique via son adresse e-mail
    async getUser(email) {
        try {
            conn = await pool.getConnection();
            query = "SELECT * FROM users WHERE email = ?";
            const rows = await conn.query(query, email);
            conn.end();
            return rows[0];
        } catch (err) {
            throw err;
        }
    },

    // Récupère les données d'un utilisateur spécifique via son ID
    async getUserById(id) {
        try {
            conn = await pool.getConnection();
            query = "SELECT * FROM users WHERE id = ?";
            const rows = await conn.query(query, id);
            conn.end();
            return rows[0];
        } catch (err) {
            throw err;
        }
    },

    async setUserProfilePicture(data) {
        try {
            conn = await pool.getConnection();
            query = "UPDATE users SET pictureUrl = ? WHERE id = ?";
            const rows = await conn.batch(query, [data]);
            conn.end();
            return rows[0];
        } catch (err) {
            throw err;
        }
    },
    // Vérifie les permissions administrateurs d'un utilisateur spécifique via son ID
    async isUserAdmin(userId) {
        try {
            conn = await pool.getConnection();
            query = "SELECT isAdmin FROM users WHERE id = ?";
            const rows = await conn.query(query, userId);
            conn.end();
            return (rows[0].isAdmin === 1) ? true : false;
        } catch (err) {
            throw err;
        }
    },

    // Supprime un utilisateur spécifique via son ID
    async deleteUser(userId) {
        try {
            conn = await pool.getConnection();
            query = "DELETE FROM users WHERE id = ?";
            const rows = await conn.query(query, userId);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    }
}