const { checkRequiredObjectKey } = require("../libs/utils");

exports.getAll = () => {
  try {
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};

exports.getById = async (bookingId) => {
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

exports.create = async (payload = {}) => {
  try {
    await checkRequiredObjectKey(payload, [
      "userId",
      "startTime",
      "endTime",
      "bookingDescription",
      "repeatUntil",
    ]);

    // database query

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

exports.cancel = (bookingId) => {
  try {
    // database query

    return Promise.resolve();
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};

exports.edit = (bookingId, payload = {}) => {
  try {
    // database query

    return Promise.resolve();
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};
