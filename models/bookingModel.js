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
      throw new Error("bookingID must not be empty");
    }

  
  } catch (error) {
    return Promise.reject({
      message: error.message ?? "Server Error",
      data: null,
    });
  }
};



export const create = async (payload = {}) => {
  try {
    // Ensure required keys exist in payload
    // await checkRequiredObjectKey(payload, [
    //   "UserId",
    //   "StartTime",
    //   "EndTime",
    //   "BookingDescription",
    //   "RepeatUntil",
    // ]);

    const {
      name,
      username,
      description,
      date,
      startTime,
      endTime,
      buildingId,
      roomId,
    } = payload;

    // Execute the INSERT query
    const [result] = await db.promise().execute(
      `INSERT INTO mydb.Booking (Name, Username, Description, Date, StartTime, EndTime, BuildingId, RoomId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        username,
        description,
        new Date(date),
        startTime,
        endTime,
        buildingId,
        roomId,
      ]
    );

    return Promise.resolve({
      message: "Booking created successfully.",
      data: {
        BookingId: result.insertId, // Return the auto-generated BookingId
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

    return Promise.resolve({ rows });
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};


export const edit = async (bookingId, payload = {}) => {
  try {
    const { Date, Description, EndTime } = payload;

    const [] = await db.promise().execute(
      `UPDATE mydb.Booking 
      SET 
        Date = ?, 
        Description = ?,  
        EndTime = ?
      WHERE BookingId = ?`,
      [Date, Description, EndTime, bookingId]
    );

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
    let building = buildings.find((b) => b.id == buildingId);

    if (!building) {
      return Promise.reject({ message: "Building not found!" });
    }

    const result = await Promise.all(
      building.rooms.map(async (room) => {
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
          [
            new Date(date),
            room.id,
            buildingId,
            startTime,
            startTime,
            endTime,
            endTime,
            startTime,
            endTime,
          ]
        );

        return {
          ...room,
          status: !rows.length > 0,
        };
      })
    );

    return Promise.resolve({
      ...building,
      rooms: result,
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