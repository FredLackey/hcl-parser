const nodes = require('../helpers/nodes');

const compareData = (currentData, previousData) => {

  const currentList  = nodes.toList(currentData);
  const previousList = nodes.toList(previousData);

  return {
    changed: nodes.findChanged(currentList, previousList),
    missing: nodes.findMissing(currentList, previousList),
    new    : nodes.findNew(currentList, previousList),
  }

};

module.exports = compareData;