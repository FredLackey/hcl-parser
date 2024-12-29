const isEmpty = (line) => {

  return (typeof line === 'string' && line.trim() === '');
  
};

module.exports = isEmpty;