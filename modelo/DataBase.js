// database.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tu_contraseña',
    database: 'phpmysql'
});

module.exports = pool;