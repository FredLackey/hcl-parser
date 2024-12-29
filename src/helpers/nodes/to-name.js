const _ = require('cleaner-node');
const { NODE_TYPES } = require('../../constants');

const toNodeName = (line) => {

  if (!_.isValidString(line)) {
    return null;
  }

  const parts = line.split(' ').filter(x => _.isValidString(x)).map(x => x.trim());
  if (parts.length < 2) {
    return null;
  }
  if (parts[parts.length - 1] !== '{') {
    return null;
  }

  const key = Object.keys(NODE_TYPES).find(key => parts[0] === NODE_TYPES[key]);
  if (!key) {
    return null;
  }

  parts.shift();
  parts.pop();

  const quoted = parts.filter(x => x && x.startsWith('"') && x.endsWith('"') && x.length > 2);
  if (quoted.length !== parts.length) {
    return null;
  }

  parts.forEach((part, i) => {
    parts[i] = part.replace(/"/g, '');
  });

  return `${NODE_TYPES[key]}(${parts.join('.')})`;
}

module.exports = toNodeName;