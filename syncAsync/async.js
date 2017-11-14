'use strict';

var fs = require('fs');

fs.readFile('/etc/paths', 'utf8', function(err, data) {
  if (err) {
    throw err;
  }

  console.log(data);
});

console.log(1 + 2);
