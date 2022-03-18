const filterObj = (obj, ...properties) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (properties.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

module.exports = { filterObj };
