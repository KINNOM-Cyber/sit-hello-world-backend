import db from "../config/database.js";

export const getAll = async () => {
    const [rows] = await db.promise().query("SELECT * FROM User");
    return rows;
};

export const getById = async (userId) => {
    const [rows] = await db.promise().query(
      `SELECT * FROM User WHERE UserId = '${userId}'`
    );
    return rows[0];
};
