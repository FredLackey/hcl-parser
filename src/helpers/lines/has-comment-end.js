const hasCommentEnd = line => {
  return line.includes('*/');
};

module.exports = hasCommentEnd;