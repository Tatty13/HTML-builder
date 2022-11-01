const fs = require('fs');
const path = require('path');

const { stdout } = process;

function copyDir() {
  makeDir();
  let copiedFiles = [];
  fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
    copiedFiles = files;
    fs.readdir(path.join(__dirname, 'files'), (err, files) => {
      copiedFiles.forEach(file => {
        if (!files.includes(file)) {
          fs.rm(path.join(__dirname, 'files-copy', file), err => {
            if (err) stdout.write(err);
          })
        }
      })
      files.forEach(file => {
        fs.copyFile(
          path.join(__dirname, 'files', file),
          path.join(__dirname, 'files-copy', file),
          err => {
            if (err) throw err;
          }
          )
      });
    });
  })
}

copyDir();

function makeDir() {
  fs.mkdir(
    path.join(__dirname, 'files-copy'),
    { recursive: true },
    err => {
      if (err) throw err;
    }
  );
}
