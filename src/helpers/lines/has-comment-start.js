const hasCommentStart = line => {
  return line.includes('/*');
};

module.exports = hasCommentStart;