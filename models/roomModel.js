import db from "../config/database.js";

export const getAll = async () => {
    const [rows, fields] = await db.promise().query("SELECT * FROM Room;");
    return rows;
};

export const getById = async (roomId) => {
    const [rows, fields] = await db.promise().query(
      `select * from Room where RoomId = '${roomId}'`
    );
    return rows[0];
};
