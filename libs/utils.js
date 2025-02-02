exports.checkRequiredObjectKey = (obj = {}, requiredKeys = []) => {
  if (!obj || typeof obj == "undefined" || !Object.entries(obj).length) {
    return Promise.reject("obj must be provided");
  }
  if (!requiredKeys || typeof requiredKeys == "undefined" || !requiredKeys.length) {
    return Promise.reject("requireKeys must be provided");
  }

  const missingRequiredKeys = requiredKeys.filter((key) => !(key in obj));
  if (missingRequiredKeys.length > 0) {
    return Promise.reject(
      `The following keys are missing: ${missingRequiredKeys.join(", ")}`
    );
  }

  return Promise.resolve();
};
