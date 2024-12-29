const _ = require('cleaner-node');

const isEmptyProperty = line => {

  return _.isValidString(line) && line.trim().endsWith('=') && line.trim().length > 1;

};

module.exports = isEmptyProperty;