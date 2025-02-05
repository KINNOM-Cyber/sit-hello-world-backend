/**
 * Validates that all required keys are present in the given object.
 * 
 * This function checks whether the provided object (`obj`) is valid, whether the array of required keys (`requiredKeys`)
 * is provided, and whether all keys in the `requiredKeys` array are present in the object. If any key is missing, it
 * returns a rejected promise with a detailed error message listing the missing keys. If everything is valid, it returns
 * a resolved promise.
 * 
 * @param {Object} obj - The object to validate.
 * @param {Array<string>} requiredKeys - An array of keys that must be present in the object.
 * @returns {Promise} - A promise that resolves if all required keys are present or rejects with an error message if any key is missing.
 */

export const checkRequiredObjectKey = (obj = {}, requiredKeys = []) => {
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
