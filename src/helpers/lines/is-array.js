const _ = require('cleaner-node');

const isArray = (line) => {

  const parts = line.trim().split(' ').filter(x => _.isValidString(x));

  return parts.length >= 3
    && parts[1] === '='
    && parts[2].startsWith('[')
    && parts[parts.length - 1].endsWith(']');

};

module.exports = isArray;
