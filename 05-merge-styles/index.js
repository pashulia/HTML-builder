const fs = require('fs');
const path = require('path');
const style = path.join(__dirname, 'styles');
const boundle = path.join(__dirname, 'project-dist', 'boundle.css');

fs.readdir(style, 'utf-8', function(err, files) {
  if (err) {
    throw err;
  }
  fs.writeFile(boundle, '', function(err) {
    if (err) {
      throw err;
    }
  });
  files.forEach(function(file) {
    if (path.parse(path.join(style, file)).ext === '.css') {
      let stream = fs.createReadStream(path.join(style, file));
      stream.on('data', function(data) {
        fs.appendFile(boundle, data, function(err) {
          if (err) {
            throw err;
          }
        });
      });
    }
  });
});