const fs = require('fs');

fs.readFile('/etc/paths', 'utf8', function(err, data) {
  if (err) {
    throw err;
  }

  console.log(data);
});
