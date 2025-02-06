import { checkRequiredObjectKey } from "../utils/utils.js";

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

    // database query

    // need output like this
    // return Promise.resolve({
    //   data: {
    //     bookingId,
    //     bookingDate: new Date(),
    //     bookingDescription: "Booking test",
    //     startTime: new Date("2025-02-10").setHours(10),
    //     endTime: new Date("2025-02-10").setHours(13),
    //     repeatUntil: new Date("2025-05-30"),
    //     user: {
    //       userId: 1,
    //       name: "John",
    //       lastname: "Cena",
    //       role: "student",
    //       email: "johny@mail.kmutt.ac.th",
    //     },
    //     room: {
    //       roomId: 1,
    //       buildingName: "LX",
    //       roomCode: "LX10/3-4",
    //     },
    //   },
    // });
    
  } catch (error) {
    return Promise.reject({
      message: error.message ?? "Server Error",
      data: null,
    });
  }
};

// exports.create = async (payload = {}) => {
//   try {
//     await checkRequiredObjectKey(payload, [
//       "userId",
//       "startTime",
//       "endTime",
//       "bookingDescription",
//       "repeatUntil",
//     ]);

//     `INSERT INTO Booking (UserId, StartTime, EndTime, BookingDescription, RepeatUntil)
//       VALUES (?, ?, ?, ?, ?)`

//     return Promise.resolve({
//       data: {
//         ...payload,
//       },
//     });
//   } catch (error) {
//     return Promise.reject({
//       message: error.message || error || "Server Error",
//       data: null,
//     });
//   }
// };

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

    const { UserId, StartTime, EndTime, BookingDescription, RepeatUntil } = payload;

    // Execute the INSERT query
    const [result] = await db.promise().execute(
      `INSERT INTO mydb.Booking (UserId, StartTime, EndTime, BookingDescription, RepeatUntil)
      VALUES (?, ?, ?, ?, ?)`,
      [UserId, StartTime, EndTime, BookingDescription, RepeatUntil]
    );

    // // Check if the insert was successful
    // if (result.affectedRows === 0) {
    //   return Promise.reject({
    //     message: "Booking creation failed.",
    //     data: null,
    //   });
    // }

    // Return success response with the inserted data
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
    WHERE BookingId =  ?;`, [bookingId]
    );

    return Promise.resolve({ rows });

  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};

// exports.edit = async (bookingId, payload = {}) => {
//   try {

//     await checkRequiredObjectKey(payload, [
//       "BookingDate",
//       "BookingDescription",
//       "EndTime",
//       "RepeatType",
//       "RepeatUntil",
//     ]);

//     `UPDATE mydb.Booking 
//       SET 
//         bookingDate = ?, 
//         bookingDescription = ?,  
//         endTime = ?,  
//         repeatType = ?, 
//         repeatUntil = ?
//       WHERE bookingId = ?`

//     return Promise.resolve({
//       data: {
//         ...payload,
//       },
//     });

//   } catch (error) {
//     return Promise.reject({
//       message: error.message || error || "Server Error",
//       data: null,
//     });
//   }
// };

export const edit = async (bookingId, payload = {}) => {
  try {
    const { BookingDate, BookingDescription, EndTime, RepeatType, RepeatUntil } = payload;
    
    const [result] = await db.promise().execute(
      `UPDATE mydb.Booking 
      SET 
        BookingDate = ?, 
        BookingDescription = ?,  
        EndTime = ?,  
        RepeatType = ?, 
        RepeatUntil = ?
      WHERE BookingId = ?`,
      [BookingDate, BookingDescription, EndTime, RepeatType, RepeatUntil, bookingId]
    );

    return Promise.resolve({
      message: "Booking updated successfully.",
      data: {
        BookingId: bookingId,
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

export const filter = async(roomId) => {

  // const {roomId} = roomId;

  try {
    `SELECT RoomId
    FROM Room 
    WHERE RoomId NOT IN (SELECT DISTINCT RoomId FROM Booking);`

    return Promise.resolve();
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};