const _ = require('cleaner-node');

const isTagsStart = line => {

  const parts = line.trim().split(' ').filter(x => _.isValidString(x));

  return parts.length === 3
    && parts[0] === 'tags'
    && parts[1] === '='
    && parts[2] === '{';

};

module.exports = isTagsStart;
