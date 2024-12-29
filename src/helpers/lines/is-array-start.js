const _ = require('cleaner-node');

const isArrayStart = line => {

  if (!_.isValidString(line)) {
    return false;
  }

  const parts = line.trim().split(' ').filter(part => _.isValidString(part));

  return parts.length >= 3 && parts[1] === '=' && parts[2].startsWith('[');
};

module.exports = isArrayStart;
