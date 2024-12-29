const _ = require('cleaner-node');

const hash = line => {

  if (!_.isValidString(line)) {
    return '';
  }

  const parts = line.trim().split(' ').filter(x => _.isValidString(x));

  return parts.join('');
};

module.exports = hash;