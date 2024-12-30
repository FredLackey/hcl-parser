const findNew = (currentNodes, previousNodes) => {
  return [].concat(currentNodes).filter((node) => {
    return ![].concat(previousNodes).find((x) => {
      return x.name === node.name;
    });
  });
};

module.exports = findNew;
