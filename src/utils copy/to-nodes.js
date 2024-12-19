const _          = require('cleaner-node');
const toNodeName = require('./to-node-name');
const toDataBlock = require('./to-data-block');

const toNodes = lines => {

  const nodes = {};

  let node = null;
  let data = null;
  let level = 0;
  let inTags = false;
  let inTagsAll = false;

  for (let i = 0; i < lines.length; i++) {

    const line = lines[i];

    if (node) {
      node.lines = node.lines || [];
      node.lines.push(line);
    }

    const nodeName = node ? null : toNodeName(line);
    if (!node && !nodeName) {
      continue;
    }

    if (nodeName) {
      node = {
        name: toNodeName(line),
        lines: [line]
      };
      continue;
    }

    if (!node) {
      continue;
    }

    if (inTags || inTagsAll) {

      if (line.trim() === '}') {
        nodes.push(JSON.parse(JSON.stringify(node)));
        node = null;
        continue;
      }

      if (inTags || inTagsAll) {
        if (inTags) {
          node.tags.lines.push(line);
        }
        if (inTagsAll) {
          node.tagsAll.lines.push(line);
        }
        if (line.trim() === '}') {
          inTags = false;
          inTagsAll = false;
          continue;
        }
        continue;
      }

      if (line.trim() === 'tags = {') {
        inTags = true;
        node.tags = {
          lines: [line]
        }
        continue;
      }

      if (line.trim() === 'tags_all = {') {
        inTagsAll = true;
        node.tagsAll = {
          lines: [line]
        }
        continue;
      }
  
    }

    if (!data || level === 0) {
      data = toDataBlock(line);
      if (data) {
        continue;
      }
    }
    if (data) {

      data.lines.push(line);
    
      if (line.trim() === data.key) {
        node.data = node.data || [];
        node.data.push(data);
        data = null;
      }

      continue;
      
    }
    
    const lineHash = line.split(' ').filter(x => _.isValidString(x)).join('');
    if (lineHash !== '{' && lineHash.endsWith('{') & !lineHash.endsWith('={')) {
      level++;
      continue;
    }
    if (level > 0 && lineHash === '}') {
      level--;
      continue;
    }



    




  }


};

module.exports = toNodes;