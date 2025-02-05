const { createConnection } = require("mysql2/promise");
const config = require("./config");

const connection = createConnection({ ...config });

module.exports = connection;
