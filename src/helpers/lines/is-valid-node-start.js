const _ = require('cleaner-node');
const { NODE_TYPES } = require('../../constants');

const isValidNodeStart = line => {

  if (!_.isValidString(line)) {
    return false;
  }

  const parts = line.trim().split(' ').filter(x => _.isValidString(x));
  if (parts.length < 2) {
    return false;
  }

  if (parts[parts.length - 1] !== '{') {
    return false;
  }

  if (!NODE_TYPES.includes(parts[0])) {
    return false;
  }

  if (parts.length === 2) {
    return true;
  }

  parts.shift();
  parts.pop();

  const unquoted = parts.filter(x => !x.startsWith('"') && !x.endsWith('"'));
  if (unquoted.length > 0) {
    return false;
  }

  return true;
};

module.exports = isValidNodeStart;