const { compare } = require('../src');

const CURENT_FOLDER = '/Users/flackey/Source/fredlackey/paas-manager/runner/assets/sample/ouput/hcl/20241218082712';
const PREVIOUS_FOLDER = '/Users/flackey/Source/fredlackey/paas-manager/runner/assets/sample/ouput/hcl/20241218082436';

const main = async () => {

  const data = await compare(CURENT_FOLDER, PREVIOUS_FOLDER);

  const files = data.files.filter(x => x.nodes.some(y => y?.tags))
  for (const file of files) {
    const nodes = file.nodes.filter(x => x?.tags);
    for (const node of nodes) {
      console.log(node.tags);
    }
  }

  console.log(data);

};

main();