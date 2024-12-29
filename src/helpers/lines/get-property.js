const getProperty = line => {

  const idx = line.indexOf('=');

  if (idx < 0 ) {
    return null;
  }

  const key = line.substring(0, idx).trim();
  if (!key) {
    return null;
  }

  let value = line.substring(idx + 1).trim();
  let quoted = false;

  while(value.startsWith('"') && value.endsWith('"')) {
    value = value.substring(1, value.length - 1).trim();
  }

  return { key, value, quoted };
  
};

module.exports = getProperty;