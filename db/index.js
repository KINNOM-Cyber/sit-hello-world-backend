const { createConnection } = require("mysql2");
const config = require("./config");
console.log(config)
const connection = createConnection({ ...config });

module.exports = connection;
