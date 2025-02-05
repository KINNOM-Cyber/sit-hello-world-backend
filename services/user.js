const db = require("../db");

exports.getAll = async () => {
  try {
    await db.connect();

    const [rows, fields] = await db.execute("select * from user;");

    return Promise.resolve({ rows });
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};

exports.getById = (userId) => {
  try {
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};
