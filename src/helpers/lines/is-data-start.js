const _ = require('cleaner-node');
const getDataLineKey = require('./get-data-key');

const isDataStart = line => {

  return _.isValidString(getDataLineKey(line));

};

module.exports = isDataStart;
