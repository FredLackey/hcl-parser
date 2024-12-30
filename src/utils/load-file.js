const _              = require('cleaner-node');
const { lines: l, nodes: n }   = require('../helpers');
const { TAB_SIZE, LINE_TYPES: lt } = require('../constants');

const loadFile = async (filePath) => {

  const lines = await _.readLines(filePath);
  const tab   = ''.padStart(TAB_SIZE, ' ');

  for (let i = 0; i < lines.length; i += 1) {
    lines[i] = lines[i].replace(/\t/g, tab);
  }

  const nodes     = [];
  let   node      = null;
  let   inTags    = false;
  let   inTagsAll = false;
  let   inComment = false;
  let   level     = 0;
  let   dataKey   = null;

  for (let i = 0; i < lines.length; i += 1) {
  
    const line = lines[i];
    const type = l.getType(line);

    if (!node && type === lt.NODE_START) {
      node = {
        lines: [line]
      };
      continue;
    }
    if (!node) {
      continue;
    }

    node.lines.push(line);

    if (line.trim().length === 0) {
      continue;
    }

    //#region COMMENTS

    if (type === lt.COMMENT) {
      continue;
    }
    if (inComment) {
      if (line.trim().endsWith('*/')) {
        inComment = false;
      }
      continue;
    }
    if (line.trim().endsWith('/*')) {
      inComment = true;
      continue;
    }

    //#endregion

    //#region DATA REGION

    if (dataKey) {
      if (l.isDataEnd(line, dataKey)) {
        dataKey = null;
      }
      continue;
    }
    if (!dataKey) {
      dataKey = l.getDataKey(line);
      if (dataKey) {
        continue;
      }
    }

    //#endregion

    //#region TAGS
    if (type === lt.TAGS_START) {
      inTags = true;
      node.tags = {};
      continue;
    }
    if (inTags && type === lt.NODE_END) {
      inTags = false;
      continue;
    }
    if (inTags) {
      const tagProp = l.getProperty(line);
      if (!tagProp) {
        console.debug(`Invalid tag property: ${line}`);
      }
      if (Object.keys(node.tags).includes(tagProp.key)) {
        console.debug(`Duplicate tag property: ${tagProp.key}`);
      }
      node.tags[tagProp.key] = tagProp.value;
      continue;
    }
    //#endregion
    //#region TAGS_ALL
    if (type === lt.TAGSALL_START) {
      inTagsAll = true;
      node.tagsAll = {};
      continue;
    }
    if (inTagsAll && type === lt.NODE_END) {
      inTagsAll = false;
      continue;
    }
    if (inTagsAll) {
      const tagProp = l.getProperty(line);
      if (!tagProp) {
        console.debug(`Invalid tag property: ${line}`);
      }
      if (Object.keys(node.tagsAll).includes(tagProp.key)) {
        console.debug(`Duplicate tag property: ${tagProp.key}`);
      }
      node.tagsAll[tagProp.key] = tagProp.value;
      continue;
    }
    //#endregion

    //#region NODE LEVELS

    if (type === lt.NODE_START) {
      level += 1;
      continue;
    }
    if (type === lt.NODE_END && !inTags && !inTagsAll && !inComment && !dataKey) {
      level -= 1;
      if (level < 0) {
        nodes.push(node);
        node = null;
        level = 0;
      }
      continue;
    }

    //#endregion

    if (level !== 0) {
      continue;
    }

    //#region PROPERTIES

    if (type === lt.QUOTED_PROPERTY || type === lt.PROPERTY || type === lt.EMPTY_PROPERTY) {
      const prop = l.getProperty(line);
      if (!prop) {
        throw new Error(`Invalid property: ${line}`);
      }
      node.props = node.props || {};
      if (Object.keys(node.props).includes(prop.key)) {
        throw new Error(`Duplicate property: ${prop.key}`);
      }
      node.props[prop.key] = prop.value;
      continue;
    }

    //#endregion

    if (dataKey) {
      console.debug(`Unhandled data line: ${line}`);
      continue;
    }

    if (type === lt.UNKNOWN) {
      console.debug(`Unknown line type: ${line}`);
      continue;
    }

    console.debug(`Unhandled line type: ${type}`);

  }

  nodes.forEach((node, i) => {
    nodes[i].name = n.toName(node.lines[0]);
  });

  // Find notes without a name
  const unnamed = nodes.filter(x => !x?.name);
  if (unnamed.length > 0) {
    console.debug('Nodes without a name:', unnamed);
  }

  return nodes;

};

module.exports = loadFile;