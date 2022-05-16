let fs = require('fs/promises');
let path = require('path');
let dir = path.join(__dirname, 'files');
let fileCopy = path.join(__dirname, 'files-copy');

fs.rm(fileCopy, {
  recursive: true,
  force: true
}).finally(function () {
  fs.mkdir(fileCopy, {
    recursive: true,
  });
  fs.readdir(dir, {
    withFileTypes: true,
  }).then(function (data) {
    data.forEach(function (item) {
      if (item.isFile()) {
        let pathItem = path.join(dir, item.name);
        let pathItemDes = path.join(fileCopy, item.name);
        fs.copyFile(pathItem, pathItemDes);
      }
    });
  });
});
