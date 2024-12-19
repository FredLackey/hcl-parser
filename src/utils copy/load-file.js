const _       = require('cleaner-node');
const toNodes = require('cleaner-node');

const loadFile = async (filePath) => {

  const lines = await _.readLines(filePath);
  const nodes = toNodes(lines);



  
};

module.exports = loadFile;