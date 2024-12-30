const toList = data => {
  const nodes = [];
  [].concat(data?.files).forEach(file => {
    [].concat(file?.nodes).forEach(n => {
      nodes.push(n);
    });
  }); 
  return nodes;
};

module.exports = toList;