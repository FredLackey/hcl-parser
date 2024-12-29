const _       = require('cleaner-node');
const toNodes = require('./to-nodes');

const loadFile = async (filePath) => {

  const lines = await _.readLines(filePath);

  return {
    path: filePath,
    nodes: toNodes(lines)
  }
  
};

module.exports = loadFile;