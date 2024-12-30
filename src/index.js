const _     = require('cleaner-node');
const path  = require('path');
const utils = require('./utils');

const parse = async (fileOrPath) => {

  const findFiles = fileOrPath => {

    if (_.isFile(fileOrPath) && fileOrPath.endsWith('.tf')) {
      return [fileOrPath];
    }
  
    if (_.isFolder(fileOrPath)) {
      const walkData = _.walk(fileOrPath);
      return [].concat(walkData?.files)
        .filter(x => x.endsWith('.tf'))
        .map(x => path.join(walkData.root, x));  
    }
  
    return null;
  
  };

  const validate = value => {

    if (!_.isFile(value) && !_.isFolder(value)) {
      return 'The path must be a file or a folder.';
    }

    const files = findFiles(value);
    if (!_.isValidArray(files)) {
      return 'The file or folder must contain at least one Terraform file.';
    }

    return null;
    
  };
  
  const err = validate(fileOrPath);
  if (err) {
    throw new Error(err);
  }

  const data = {
    request: fileOrPath,
    files  : findFiles(fileOrPath)
  }

  for (let i = 0; i < data.files.length; i += 1) {
    const filePath = data.files[i];
    data.files[i] = {
      path : filePath,
      name : path.basename(filePath),
      nodes: await utils.loadFile(filePath)
    };
  }

  return data;

};

const compare = async (currentPath, previousPath) => {

  let currentData = null;
  try {
    currentData = await parse(currentPath);
  } catch (ex) {
    throw new Error(`Error parsing current path: ${ex.message}`);
  }

  let previousData = null;
  try {
    previousData = await parse(previousPath);
  } catch (ex) {
    throw new Error(`Error parsing previous path: ${ex.message}`);
  }

  const comparison = utils.compareData(currentData, previousData);

  return {
    current : currentData,
    previous: previousData,
    comparison
  };

};

module.exports = {
  parse,
  compare
}