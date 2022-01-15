const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 5
});

module.exports = {
    getConnection() {
        return new Promise(function (res, rej) {
            pool.getConnection()
                .then((conn) => {
                    res(conn);
                })
                .catch((error) => {
                    rej(error);
                });
        });
    }
};