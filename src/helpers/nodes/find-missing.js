const findMissing = (currentNodes, previousNodes) => {
  return [].concat(previousNodes).filter((node) => {
    return ![].concat(currentNodes).find((x) => {
      return x.name === node.name;
    });
  });
}

module.exports = findMissing;