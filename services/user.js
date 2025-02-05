const db = require("../db");

exports.getAll = async () => {
  try {
    const connection = await db;
    const [rows, fields] = await connection.execute("SELECT * FROM User");
    return Promise.resolve({ rows });
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};

exports.getById = async (userId) => {
  try {
    const connection = await db;
    const [rows, fields] = await connection.execute(
      `SELECT * FROM User WHERE UserId = '${userId}'`
    );

    return Promise.resolve({ ...rows[0] });
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};
