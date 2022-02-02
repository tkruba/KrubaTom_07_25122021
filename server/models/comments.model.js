pool = require('../utils/database');

module.exports = {

    // Ajoute un nouveau commentaire
    async addNewComment(data) {
        try {
            conn = await pool.getConnection();
            query = "INSERT INTO comments (postId, posterId, comment) VALUES (?, ?, ?)";
            const rows = await conn.batch(query, [data]);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    },

    // Récupère les commentaires d'un poste spécifique via son ID
    async getComments(postId) {
        try {
            conn = await pool.getConnection();
            query = "SELECT comments.id, comments.posterId, firstname, surname, pictureUrl, comment FROM comments INNER JOIN users WHERE (comments.posterId = users.id) AND (postId = ?) ORDER BY datePublished DESC";
            const rows = await conn.query(query, postId);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    },

    // Récupère un commentaire spécifique via son ID
    async getComment(commentId) {
        try {
            conn = await pool.getConnection();
            query = "SELECT comments.id, posterId, firstname, surname, comment FROM comments INNER JOIN users WHERE comments.id = ?";
            const rows = await conn.query(query, commentId);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    },

    // Supprime un commentaire spécifique via son ID
    async deleteComment(commentId) {
        try {
            conn = await pool.getConnection();
            query = "DELETE FROM comments WHERE id = ?";
            const rows = await conn.query(query, commentId);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    },

    // Supprime tous les commentaires d'un utilisateur spécifique via son ID
    async deleteUserComments(userId) {
        try {
            conn = await pool.getConnection();
            query = "DELETE FROM comments WHERE posterId = ?";
            const rows = await conn.query(query, userId);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    },

    // Supprime tous les commentaires d'un poste spécifique via son ID
    async deleteAllComments(postId) {
        try {
            conn = await pool.getConnection();
            query = "DELETE FROM comment WHERE postId = ?";
            const rows = await conn.query(query, postId);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    }
}