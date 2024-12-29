const _ = require('cleaner-node');

const isNodeEnd = line => {

  if (!_.isValidString(line)) {
    return false;
  }

  return line.trim() === '}';

};

module.exports = isNodeEnd;