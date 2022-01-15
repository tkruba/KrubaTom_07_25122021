pool = require('../utils/database');
const bcrypt = require('bcrypt');

module.exports = {
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

    async areCredentialsValid(email, password) {
        try {
            conn = await pool.getConnection();
            query = "SELECT password FROM users WHERE email = ?";
            const rows = await conn.query(query, email);
            conn.end();
            return (rows.length == 1 && bcrypt.compare(password, rows[0].password)) ? true : false;
        } catch (err) {
            throw err;
        }
    }
}