const _ = require('cleaner-node');

const isTagsAllStart = line => {

  const parts = line.trim().split(' ').filter(x => _.isValidString(x));

  return parts.length === 3
    && parts[0] === 'tags_all'
    && parts[1] === '='
    && parts[2] === '{';

};

module.exports = isTagsAllStart;
