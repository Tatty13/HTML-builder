const fs = require('fs');
const path = require('path');

const { stdout } = process;

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  files.forEach(file => {
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
      if (stats.isFile()) {
        const fileInfo = path.parse(file);
        stdout.write(`${fileInfo.name} - ${fileInfo.ext.slice(1)} - ${stats.size}b\n`);
      }
    })
  });
});