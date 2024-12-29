const _ = require('cleaner-node');

const isQuotedProperty = line => {

  if (!_.isValidString(line)) {
    return false;
  }

  const parts = line.trim().split('=').filter(x => _.isValidString(x)).map(x => x.trim());
  if (parts.length < 2) {
    return false;
  }

  return parts[1].startsWith('"') && parts[parts.length - 1].endsWith('"');
}

module.exports = isQuotedProperty;