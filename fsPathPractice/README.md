## How do you use the `fs` and `path` modules to interact with the filesystem?

Before using asynchronous I/O to build a Node.js HTTP server, it's a good idea to practice interacting with the filesystem first. For this, you use the `fs` and `path` modules.

The `fs` module is the built-in Node.js API for managing a computer's filesystem. As you can see from the [documentation][fs], the `fs` module can perform a plethora of I/O operations. Each operation has both an asynchronous and synchronous method (e.g. `readFile` and `readFileSync`).

The `path` module is the built-in Node.js API for handling and transforming file paths across different operating systems. The `path` module is indispensable when building cross-platform applications. On Unix-based operating systems, the path delimiter is the forward slash `/`. While on Windows, it's the back slash `\`. As you can see from the [documentation][path], the `path` module is just a collection of utilities that don't perform any I/O operations. In other words, the methods in the `path` module don't consult the filesystem to see whether or not a path is valid.

With the documentation handy, let's play around with the `fs` and `path` modules. Imagine you're throwing a party and you need to keep a database of all the guests you plan on inviting. Instead of maintaining a Google Spreadsheet, you decide to build a small, command-line application written in Node.js. The application will accept a few subcommands and log the results to the console. The subcommands will manage the content of a database which will be a JSON-formatted `guests.json` file.

To get started, you'll need to create a new project.

```shell
mkdir party
cd party
echo '[]' > guests.json
touch guests.js
git init
git add .
git commit -m 'Initial commit'
```

Open the `party` project in your text editor.

```shell
atom .
```

And type in the following code to the `guests.js` file.

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

fs.readFile(guestsPath, 'utf8', function(err, data) {
  if (err) {
    throw err;
  }

  var guests = JSON.parse(data);

  console.log(guests);
});
```

Now, run the program using the `node` command.

```shell
$ node guests.js
[]
```

Then, add and commit the latest changes to the `party` project's repository.

```shell
git add .
git commit -m 'Add the basic scaffold'
```

Next, refactor the `guests.js` file by adding a `read` subcommand.

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(guestsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var guests = JSON.parse(data);

    console.log(guests);
  });
}
else {
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1);
}
```

Now, run the program using the `node` command, both with and without the `read` subcommand.

```shell
$ node guests.js
Usage: node guests.js read

$ node guests.js read
[]
```

Then, add and commit the latest changes to the `party` project's repository.

```shell
git add .
git commit -m 'Add the read subcommand'
```

Next, refactor the `guests.js` file by adding a `create` subcommand as well.

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(guestsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var guests = JSON.parse(data);

    console.log(guests);
  });
}
else if (cmd === 'create') {
  fs.readFile(guestsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var guests = JSON.parse(data);
    var guest = process.argv[3];

    if (!guest) {
      console.error(`Usage: ${node} ${file} ${cmd} GUEST`);
      process.exit(1);
    }

    guests.push(guest);

    var guestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, guestsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(guest);
    });
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create]`);
  process.exit(1);
}
```

Now, run the program using the `node` command, both with and without the `create` subcommand.

```shell
$ node guests.js
Usage: node guests.js [read | create]

$ node guests.js create
Usage: node guests.js create GUEST

$ node guests.js create Mary
Mary

$ node guests.js read
[ 'Mary' ]

$ node guests.js create Don
Don

$ node guests.js read
[ 'Mary', 'Don' ]
```

Finally, add and commit the latest changes to the `party` project's repository.

```shell
git add .
git commit -m 'Add the create subcommand'
```

And there you have it! You just built a small Node.js program to read and create party guests to a file-based database.
