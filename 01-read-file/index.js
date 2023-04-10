const path = require('path');
const fs = require('fs');
const { stdout } = process;

const reader = fs.createReadStream(path.join(__dirname, 'text.txt'), { encoding: 'utf-8' });

reader.on('data', chunk => {
  stdout.write(chunk);
})