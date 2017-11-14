'use strict';

var fs = require('fs');

var data = fs.readFileSync('/etc/paths', 'utf8');

console.log(data);
console.log(1 + 2);
