const mysql = require("mysql");
const co = require("co-mysql");

const connection = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "123456",
    database: "music_app"
});

module.exports = co(connection);