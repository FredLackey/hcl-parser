# HCL Parser (`hcl-parser`)  

Parses and compares Terraform HCL IaC files.

## Installation  

`npm i @fredlackey/hcl-parser`  

## Resulting Data  

Each file converted to a object structured as follows:  

### File Object  

```javascript
{
  name : 'filename.tf',
  path : '/var/hcl/all-files/filename.tf',
  nodes: []  // Array of Nodes found within the file
}
```

### Node Object  

```javascript
{
  lines  : [],  // Lines from the HCL file for the node
  name   : 'aws_instance(my-instance)',
  props  : {},
  tags   : {},
  tagsAll: {}
}
```

## Usage  

The HCL Parser will load and compare single Terraform HCL IaC files or a full directory structure of files.  Supply either a folder path or a file path.

### Parsing a Folder Structure  

```javascript
const hclParser = require('@fredlackey/hcl-parser');

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

## Limitations  

Detection of Tags / Tags All only works with AWS at the moment.  Will be expanding to support Google Cloud Platform's Label logic.

## Contact Info  

Need a hand with your Terraform implementation?  Feel free to drop me a note:  

**Fred Lackey**  
[https://fredlackey.com](https://fredlackey.com)  
[fred.lackey@gmail.com](mailto:fred.lackey@gmail.com)  
