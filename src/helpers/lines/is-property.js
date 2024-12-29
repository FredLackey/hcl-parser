const _ = require('cleaner-node');

const isProperty = line => {

  if (!_.isValidString(line)) {
    return false;
  }

  const parts = line.trim().split('=').filter(x => _.isValidString(x));
  if (parts.length < 2) {
    return false;
  }

  return true;
};

module.exports = isProperty;