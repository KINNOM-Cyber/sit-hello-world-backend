const { checkRequiredObjectKey } = require("../libs/utils");

exports.get = async (bookingId) => {
  try {
    if (!bookingId) {
      throw new Error("bookingID must not be empty");
    }

    return Promise.resolve({
      data: {
        bookingId,
        bookingDate: new Date(),
        bookingDescription: "Booking test",
        startTime: new Date("2025-02-10").setHours(10),
        endTime: new Date("2025-02-10").setHours(13),
        repeatUntil: new Date("2025-05-30"),
        user: {
          userId: 1,
          name: "Kittihengcharoen",
          lastname: "Chaemprasert",
          role: "student",
          email: "kittihengcharoen.chae@mail.kmutt.ac.th",
        },
        room: {
          roomId: 1,
          buildingName: "LX",
          roomCode: "LX10/3-4",
        },
      },
    });
  } catch (error) {
    return Promise.reject({
      message: error.message ?? "Server Error",
      data: null,
    });
  }
};

exports.create = async (payload = {}) => {
  try {
    console.dir(payload, "%o");

    await checkRequiredObjectKey(payload,["userId",  "startTime", "endTime","bookingDescription","repeatUntil"])

    return Promise.resolve({
      data: {
        ...payload,
      },
    });
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};

exports.cancel = (bookingId) => {};

exports.edit = (bookingId, payload = {}) => {};

