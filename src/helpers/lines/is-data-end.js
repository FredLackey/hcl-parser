const _ = require('cleaner-node');

const isDataEnd = (line, key) => {

  return key
    ? line.trim() === key
    : _.isValidChars(line.trim().toUpperCase(), _.ALPHANUMERIC.toUpperCase() + '_');

};

module.exports = isDataEnd;
