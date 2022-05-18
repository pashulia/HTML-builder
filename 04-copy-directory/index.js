const fs = require('fs/promises');
const path = require('path');
const dir = path.join(__dirname, 'files');
const fileCopy = path.join(__dirname, 'files-copy');

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
