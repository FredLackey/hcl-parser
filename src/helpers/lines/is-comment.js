const isComment = line => {
  return line.trim().startsWith('//') || line.trim().startsWith('#');
};

module.exports = isComment;