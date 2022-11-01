const fs = require('fs');
const path = require('path');

const { stdout, stderr } = process;


function init() {
  fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    '',
    err => {
      if (err) return stderr.write(err.message);
    })
}

fs.readFile(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  err => {
    if (err) init();
  }
);

fs.writeFile(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  '',
  err => {
    if (err) return stderr.write(err.message);
  }
); 

fs.readdir(
  path.join(__dirname, 'styles'),
   (err, files) => {
    files.forEach(file => {
      let fileExt = path.extname(path.join(__dirname, 'styles', file));
      
      fs.stat(path.join(__dirname, 'styles', file), (err, stats) => {
        if (stats.isFile() && fileExt === '.css') {


          fs.readFile(
            path.join(__dirname, 'styles', file),
            'utf-8',
            (err, data) => {

            fs.appendFile(
                path.join(__dirname, 'project-dist', 'bundle.css'),
                data,
                err => {
                  if (err) return stderr.write(err.message);
                }
              ) 

            }
          ); 

        }
      })
    })
   }
);