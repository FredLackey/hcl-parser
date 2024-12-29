const _ = require('cleaner-node');

const isArrayEnd = (line) => {

  return line.trim().endsWith(']');

};

module.exports = isArrayEnd;
