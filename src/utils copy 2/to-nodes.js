const _           = require('cleaner-node');
const toNodeName  = require('./to-node-name');
const getNodeData = require('./get-node-data');

const { TAB_SPACE } = process.env;
const TAB = ''.padStart(parseInt(TAB_SPACE), ' ');

const toNodes = lines => {

  const nodes = [];

  let node  = null;
  let level = 0;

  for (let i = 0; i < lines.length; i += 1) {

    let line = lines[i];
    while (line.includes('\t')) {
      line = line.replace('\t', TAB);
    }

    const nodeName = (!node && _.isValidString(line) && !line.startsWith(' ')) ? toNodeName(line) : null;

    if (!node && nodeName) {
      node = {
        name: nodeName,
        lines: [line]
      };
      continue;
    }

    if (node) {
      node.lines.push(line);
    }

    if (line.trim().endsWith('{') && !line.trim().endsWith('={')) {
      level = level + 1;
      continue;
    }

    if (level > 0 && line.trim() === '}') {
      level = level - 1;
      continue;
    }

    if (node && level === 0 && line === '}') {

      node.data = getNodeData(node);

      nodes.push(node);
      node = null;
      continue;
    }

  }

  return nodes;

};

module.exports = toNodes;