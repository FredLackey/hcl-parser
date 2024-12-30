const _ = require('cleaner-node');
const hash = require('./hash');

const isNodeStart = line => {

  if (!_.isValidString(line)) {
    return false;
  }

  const hashed = hash(line);
  if (!hashed || hashed.length === 1 || !hashed.endsWith('{')) {
    return false;
  }

  const parts = line.trim().split(' ').filter(x => _.isValidString(x));
  if (parts.length < 2) {
    return false;
  }
  if (!_.isValidChars(parts[0], _.ALPHANUMERIC.toUpperCase() + '_')) {
    return false;
  }
  if (parts[parts.length - 1] !== '{') {
    return false;
  }
  
  return true;

};

module.exports = isNodeStart;