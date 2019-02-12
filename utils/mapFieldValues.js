/**
 * Maps array of filed values to object of filed and value
 * @param {Array} fieldValuesArr
 * @param {any} value
 *
 * @returns {Object} map
 */
const mapFieldValues = (fieldValuesArr, value) => fieldValuesArr.reduce((acc, item) => {
  acc[item] = value;

  return acc;
}, {});

export default mapFieldValues;
