pool = require('../utils/database');

module.exports = {
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

    async getComments(postId) {
        try {
            conn = await pool.getConnection();
            query = "SELECT comments.posterId, firstname, surname, comment FROM comments INNER JOIN users WHERE (comments.posterId = users.id) AND (postId = ?) ORDER BY datePublished DESC";
            const rows = await conn.query(query, postId);
            conn.end();
            return rows;
        } catch (err) {
            throw err;
        }
    },

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