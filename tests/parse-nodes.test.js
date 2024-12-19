const { parse } = require('../src');

const TEST_FOLDER = '/Users/flackey/Source/fredlackey/paas-manager/runner/assets/sample/ouput/hcl/20241218082712';

const main = () => {

  const nodes = parse(TEST_FOLDER);
  console.log(nodes);

};

main();