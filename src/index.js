const _        = require('cleaner-node');
const path     = require('path');
const loadFile = require('./utils/load-file');

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
      nodes: await loadFile(filePath)
    };
  }

  return data;

};

module.exports = {
  parse,
}