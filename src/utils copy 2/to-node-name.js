const _ = require('cleaner-node');

const toNodeName = (line) => {

  if (!_.isValidString(line)) {
    return null;
  }

  const lineHash = line.split(' ').filter(x => _.isValidString(x)).join('');
  if (lineHash.endsWith('={') || !lineHash.endsWith('{')) {
    return null;
  }

  const parts = line.split(' ').map(x => x.trim()).filter(x => x.length > 0 && x !== '{');
  if (parts.length === 0) {
    return null;
  }

  const lastPart = parts[parts.length - 1];
  if (!_.isValidString(lastPart)) {
    return null;
  };

  if (lastPart.endsWith('={')) {
    return null;
  }
  if (lastPart.endsWith('}')) {
    return null;
  }
  if (!_.isAlpha(parts[0])) {
    return null;
  }

  if (parts.length === 1 && parts[0] === 'terraform') {
    return {
      tType: 'terraform'
    }
  }

  if (parts.length === 1) {
    throw new Error('Unexpected node type:', parts[0]);
  }

  const quoted = parts.filter(x => x.startsWith('"') && x.endsWith('"') && x.length > 2);
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

  const result = {
    type  : parts[0],
    short : quoted.length === 1 ? quoted[0]   : quoted[1],
    formal: `${parts[0]}(${quoted.join('.')})`,
    parts,
  }

  if (result.formal.endsWith('()')) {
    result.formal = result.formal.substring(0, result.formal.length - 2);
  }

  return result;

}

module.exports = toNodeName;