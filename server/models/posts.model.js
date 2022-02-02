pool = require('../utils/database');

module.exports = {

    // Ajoute un nouveau poste
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

    // Récupère un poste spécifique via son ID
    async getPost(postId) {
        try {
            conn = await pool.getConnection();
            query = "SELECT DISTINCT posts.id, posts.posterId, message, imageUrl, firstname, surname, pictureUrl, posts.datePublished, COUNT(comments.postId) OVER (PARTITION BY posts.Id) AS comments FROM posts LEFT JOIN comments ON posts.id = comments.postId INNER JOIN users ON posts.posterId = users.id WHERE posts.id = ? ";
            const rows = await conn.query(query, postId);
            conn.end();
            return rows[0];
        } catch (err) {
            throw err;
        }
    },

    // Récupère tous les postes d'un utilisateur spécifique via son ID
    async getUserPosts(userId) {
        try {
            conn = await pool.getConnection();
            query = "SELECT DISTINCT posts.id, posts.posterId, message, imageUrl, firstname, surname, pictureUrl, posts.datePublished, COUNT(comments.postId) OVER (PARTITION BY posts.Id) AS comments FROM posts LEFT JOIN comments ON posts.id = comments.postId INNER JOIN users ON posts.posterId = users.id WHERE users.id = ? ORDER BY posts.datePublished DESC";
            const rows = await conn.query(query, userId);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }

    },

    // Récupère tous les postes
    async getAllPosts() {
        try {
            conn = await pool.getConnection();
            query = "SELECT DISTINCT posts.id, posts.posterId, message, imageUrl, firstname, surname, pictureUrl, posts.datePublished, COUNT(comments.postId) OVER (PARTITION BY posts.Id) AS comments FROM posts LEFT JOIN comments ON posts.id = comments.postId INNER JOIN users ON posts.posterId = users.id ORDER BY posts.datePublished DESC";
            const rows = await conn.query(query);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    },

    // Supprime un poste spécifique via son ID
    async deletePost(postId) {
        try {
            conn = await pool.getConnection();
            query = "DELETE FROM posts WHERE id = ?";
            const rows = await conn.query(query, postId);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    },

    // Supprime tous les postes d'un utilisateur spécifique via son ID
    async deletePostFromUser(userId) {
        try {
            conn = await pool.getConnection();
            query = "DELETE FROM posts WHERE posterId = ?";
            const rows = await conn.query(query, userId);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    },

    // Récupère l'id du prochain poste
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