const _ = require('cleaner-node');

const findChanged = (currentNodes, previousNodes) => {

  const results = [];

  [].concat(currentNodes).forEach(current => {

    const previous = [].concat(previousNodes).find(previous => {
      return current && current.name === previous?.name;
    });

    if (previous && _.hashLines(previous?.lines) !== _.hashLines(current.lines)) {
      results.push({
        current,
        previous
      });
    }

  });

  return results;
}

module.exports = findChanged;
