const _ = require('cleaner-node');

const getDataKey = line => {

  if (!_.isValidString(line)) {
    return null;
  }

  const parts = line.trim().split(' ').filter(x => _.isValidString(x));
  if (parts.length !== 3 || parts[1] !== '=' || !parts[2].startsWith('<<') || parts[2].length < 3) {
    return null;
  }

  return parts[2].substring(2);
};

module.exports = getDataKey;
