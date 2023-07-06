const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'product_db',
    password: 'prductdb'
});

module.exports = pool.promise();