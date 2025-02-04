const connection = require("mysql2");
const config = require("./config");

connection.createConnection({ ...config });

module.exports = connection;
