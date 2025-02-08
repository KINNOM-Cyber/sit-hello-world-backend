import { checkRequiredObjectKey } from "../utils/utils.js";
import db from "../config/database.js";
import { buildings } from "../utils/constants.js";

export const getAll = () => {
  try {
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};

export const getById = async (bookingId) => {
  try {
    if (!bookingId) {
      throw new Error("Booking ID must not be empty");
    }

    const [rows] = await db.promise().execute(
      `SELECT * FROM mydb.Booking WHERE BookingId = ?`,
      [bookingId]
    );

    if (rows.length === 0) {
      return null; // Return null if no record found
    }

    return rows[0]; // Return the first matching record
  } catch (error) {
    return Promise.reject({
      message: error.message || "Server Error",
      data: null,
    });
  }
};

export const create = async (payload = {}) => {
  try {
    const { username, name, description, date, startTime, endTime, roomId } =
      payload;

    const [result] = await db.promise().execute(
      `INSERT INTO mydb.Booking (Username, Name, Description, Date, StartTime, EndTime, RoomId)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [username, name, description, new Date(date), startTime, endTime, roomId]
    );

    console.log({ result });

    return Promise.resolve({
      message: "Booking created successfully.",
      data: {
        BookingId: result.insertId,
        ...payload,
      },
    });
  } catch (error) {
    return Promise.reject({
      message: error.message || "Server Error",
      data: null,
    });
  }
};


export const cancel = async (bookingId) => {
  try {
    const [rows, fileds] = await db.promise().query(
      `DELETE FROM mydb.Booking
    WHERE BookingId =  ?;`,
      [bookingId]
    );

    if (rows.affectedRows === 0) {
      return Promise.reject({ message: "Booking not found", data: null });
    }

    return rows;

  } catch (error) {
    console.log("Error : ", error);
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};

export const edit = async (bookingId, payload = {}) => {
  try {
    const {
      Name,
      Description
    } = payload;

    const [result] = await db.promise().execute(
      `UPDATE mydb.Booking 
      SET Name = ?, Description = ?
      WHERE BookingId = ?`,
      [Name, Description, bookingId]
    );

    if (result.affectedRows === 0) {
      console.log(result);
      return Promise.reject({ message: "Booking not found", data: null });
    }

    return Promise.resolve({
      message: "Booking updated successfully.",
      data: {
        BookingId: bookingId,
        ...payload,
      },
    });
  } catch (error) {
    console.log("Error: ", error);
    return Promise.reject({
      message: error.message || "Server Error",
      data: null,
    });
  }
};

export const filter = async (roomId) => {
  try {
    const [results] = await db.promise().execute(
      `SELECT RoomId
    FROM Room 
    WHERE RoomId NOT IN (SELECT DISTINCT RoomId FROM Booking);`,
      [roomId]
    );

    return Promise.resolve(results);
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};

export const find = async ({ buildingId, startTime, endTime, date }) => {
  try {

    let building = buildings.find((b) => b.id == buildingId) 

    if (!building) {
      return Promise.reject({message: "Building not found!"})
    }

    const result = await Promise.all(building.rooms.map(async (room) => {
      const [rows] = await db.promise().execute(
        `SELECT 1 FROM Booking 
         WHERE Date = ? 
         AND RoomID = ? 
         AND BuildingID = ?
         AND (
           (startTime < ? AND endTime > ?)  
           OR (startTime <= ? AND endTime > ?) 
           OR (startTime >= ? AND endTime <= ?) 
         )`, 
        [new Date(date), room.id, buildingId, startTime, startTime, endTime, endTime, startTime, endTime]
      );
      

      return {
        ...room,
        status: !rows.length > 0
      };
    }));
    

    console.log("Booking ID received:", bookingId);

    return Promise.resolve({
      ...building,
      rooms: result
    });
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};

export const filterDate = async (startTime, endTime) => {
  try {
    const [results] = await db.promise().execute(
      `SELECT 
    r.BuildingName AS name,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', r.RoomId,
            'code', r.RoomCode,
            'status', CASE 
                        WHEN b.BookingId IS NULL THEN TRUE  
                        ELSE FALSE  
                      END
        )
    ) AS rooms
FROM Room r
LEFT JOIN Booking b 
    ON r.RoomId = b.RoomID 
    AND TIMESTAMP(?) < b.EndTime 
    AND TIMESTAMP(?) > b.StartTime
GROUP BY r.BuildingName;
`,
      [startTime, endTime]
    );

    return Promise.resolve(results);
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};
