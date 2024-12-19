const _ = require('cleaner-node');

const getNodeData = (node) => {

  const items = [];

  let item = null;

  for (let i = 0; i < node.lines.length; i += 1) {

    const line = node.lines[i];

    if (!item) {

      if (line.trim().length === 0) {
        continue;
      }
      if (!line.includes('<<')) {
        continue;
      }
      if (line.endsWith('<<')) {
        continue;
      }
  
      const parts = line.split('<<');
      if (parts.length !== 2) {
        continue;
      }
      if (parts[1].includes(' ')) {
        continue;
      }

      item = {
        key: parts[1],
        lines: [line]
      };

      continue;

    }

    item.lines.push(line);

    if (line.trim() === item.key) {
      items.push(item);
      item = null;
    }


  };

  return items;

};

module.exports = getNodeData;