pool = require('../utils/database');

module.exports = {
    async addNewPost(data) {
        try {
            conn = await pool.getConnection();
            query = "INSERT INTO posts (posterId, message, imageUrl) VALUES (?, ?, ?)";
            const rows = await conn.batch(query, [data]);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    },

    async getPost(postId) {
        try {
            conn = await pool.getConnection();
            query = "SELECT message, imageUrl, posterId, firstname, surname, pictureUrl FROM posts INNER JOIN users ON posts.posterId = users.id WHERE posts.id = ?";
            const rows = await conn.query(query, postId);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    },

    async getUserPosts(userId) {
        try {
            conn = await pool.getConnection();
            query = "SELECT posts.id, posterId, message, imageUrl, firstname, surname, pictureUrl FROM posts INNER JOIN users WHERE users.id = ? ORDER BY datePublished DESC";
            const rows = await conn.query(query, userId);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }

    },

    async getAllPosts() {
        try {
            conn = await pool.getConnection();
            query = "SELECT posts.id, posterId, message, imageUrl, firstname, surname, pictureUrl, datePublished FROM posts INNER JOIN users WHERE posts.posterId = users.id ORDER BY datePublished DESC";
            const rows = await conn.query(query);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    },

    async deletePost(postId) {
        try {
            conn = await pool.getConnection();
            query = "DELETE FROM posts WHERE postId = ?";
            const rows = await conn.query(query, postId);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    },

    async getNextPostId() {
        try {
            conn = await pool.getConnection();
            query = "SHOW TABLE STATUS LIKE 'posts'";
            const rows = await conn.query(query);
            conn.end();
            return rows[0].Auto_increment;
        } catch(err) {
            throw err;
        }
    }
}