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

exports.getById = (buildingId) => {
  try {
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({
      message: error.message || error || "Server Error",
      data: null,
    });
  }
};
