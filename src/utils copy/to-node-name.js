const _ = require('cleaner-node');

const toNodeName = (line) => {

  if (!_isValidString(line)) {
    return null;
  }

  if (line.split(' ').join('').trim().endsWidth('={')) {
    return null;
  }

  if (!line.trim().endsWith('}')) {
    return null;
  }

  const parts = line.split(' ');
  if (parts.length = 0) {
    return null;
  }

  const valid = parts.filter(x => _.isValidString(x));
  if (parts.length !== valid.length) {
    throw new Error('Invalid parts in line:', line);
  }

  if (!_.isAlpha(parts[0])) {
    throw new Error('Invalid first part in line:', line);
  }

  if (parts.length === 1 && parts[0] === 'terraform') {
    return {
      tType: 'terraform'
    }
  }

  if (parts.length === 1) {
    throw new Error('Unexpected node type:', parts[0]);
  }

  const quoted = parts.filter(x => x.startsWith('"') && x.endsWith('"' && x.length > 2));
  if (quoted.length === 0) {
    throw new Error('Missing quotes in line:', line);
  }
  if (quoted.length != parts.length - 1) {
    throw new Error('Invalid quotes in line:', line);
  }
  if (quoted.length > 2) {
    throw new Error('Too many quotes in line:', line);
  }

  for (let i = 0; i < quoted.length; i++) {
    quoted[i] = quoted[i].substring(1);
    quoted[i] = quoted[i].substring(0, quoted[i].length - 1);
  }

  return {
    tType: parts[0],
    pType: quoted.length === 1 ? null : parts[1],
    pName: quoted.length === 1 ? quoted[0] : quoted[1],
    formal: quoted.join('.'),
    parts: [parts[0], ...quoted],
  }

}

module.exports = toNodeName;