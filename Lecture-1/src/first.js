import sum from './second.js';

console.log("Hello, this is first");

sum(3, 7);


// file name shold be .mjs to run this code in node.js because we are using import and export which is not supported in .js file. if and only if the package.json file has "type": "module" then we can use import and export in .js file. like we are using in this file.