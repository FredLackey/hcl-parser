# HCL Parser (`hcl-parser`)  

Parses and compares Terraform HCL IaC files.

## Installation  

`npm i @fredlackey/hcl-parser`  

## Usage  

The HCL Parser will load and compare single Terraform HCL IaC files or a full directory structure of files.  Supply either a folder path or a file path.

### Parsing a Folder Structure  

```javascript
const hclParser = require('fredlackey/hcl-parser');

const TEST_FOLDER = '/var/hcl/all-files';

const main = async () => {

  const data = await parse(TEST_FOLDER);

  console.log(data);

};

main();
```

Resulting data:

```javascript  
{
  files: [],    // Array of files with nodes
  request: ''   // Supplied file or folder path
}
```  

### Comparing Folder Structures  

```javascript
const hclParser = require('fredlackey/hcl-parser');

const CURRENT = '/var/hcl/current-files';
const PREVIOUS = '/var/hcl/previous-files';

const main = async () => {

  const data = await parse(CURRENT, PREVIOUS);

  console.log(data);

};

main();
```  

Resulting data:

```javascript  
{
  comparison: {
    changed: [],  // List of nodes with differences
    missing: [],  // List of missing nodes
    new: []       // List of new nodes
  },
  current: {
    files: [],    // Array of files with nodes
    request: ''   // Supplied file or folder path
  },
  previous: {
    files: [],    // Array of files with nodes
    request: ''   // Supplied file or folder path
  },
}
```
