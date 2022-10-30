const path = require('path');
const fs = require('fs');
const { stdout, stdin } = process;


function init() {
  fs.writeFile(
    path.join(__dirname, 'text.txt'),
    '',
    err => {
      if (err) return stderr.write(err.message);
    })
}

stdout.write('Welcome! What text would you like to add to the file?\n');

fs.readFile(
  path.join(__dirname, 'text.txt'),
  err => {
    if (err) init();
  }
);

stdin.on('data', data => {
  const stringifiedData = data.toString().slice(0, -2);
  if (stringifiedData === 'exit') process.exit();

  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data,
    err => {
      if (err) return stderr.write(err.message);
    }
  ) 
});

process.on('SIGINT', () => process.exit());

process.on('exit', code => {
  if (code === 0) {
    stdout.write('Good job! See you!');
  } else {
    stdout.write(`Something went wrong. The program ended with code ${code}`);
  }
});