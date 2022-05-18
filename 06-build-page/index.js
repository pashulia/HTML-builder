const fs = require('fs');
const path = require('path');
const style = path.join(__dirname, 'styles');
const PD = path.join(__dirname, 'project-dist');
const pathAssets = path.join(__dirname, 'assets');
const pathFolder = path.join(__dirname, 'components');
const assetsCopy = path.join(PD, 'assets');

fs.readdir(style, {withFileTypes: true}, async (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(function(file, index) {
      let filePath = path.join(style, file.name);
      if (file.isFile() && file.name.split('.')[1] === 'css') {
        fs.readFile(filePath, 'utf8', function(err, data) {
          if (err) {
            console.log(err);
          } else if (index === 0) {
            fs.writeFile(path.join(PD, 'style.css'), data, function(err) {
              if (err) {
                console.log(err);
              }
            });
          } else {
            fs.appendFile(path.join(PD, 'style.css'), data, function(err) {
              if (err) {
                console.log(err);
              }
            });
          }
        });
      }
    });
  }
});

function copyRec(dir, exit) {
  fs.readdir(dir, {withFileTypes: true}, function(err, files) {
    if (err) {
      throw err;
    }
    files.forEach(function(file) {
      if (!file.isFile()) {
        fs.stat(path.join(exit, file.name), function(err) {
          if (err) {
            fs.mkdir(path.join(exit, file.name), function(err) {
              if (err) {
                return console.log(err);
              }
            });
            copyRec(`${dir}/${file.name}`, path.join(exit, file.name));
          } else {
            copyRec(`${dir}/${file.name}`, path.join(exit, file.name));
          }
        });
      } else {
        fs.copyFile(`${dir}/${file.name}`, `${exit}/${file.name}`, function(err) {
          if (err) {
            throw err;
          }
        });
      }
    });
  });
}

fs.stat(PD, function(err) {
  if (err) {
    fs.mkdir(PD, function(err) {
      if (err) {
        return console.log(err);
      }
    });
    createTemplates();
  } else {
    fs.readdir(PD, function(err) {
      if (err) {
        console.log(err);
      } else {
        createTemplates();
      }
    });
  }
});

fs.stat(assetsCopy, function(err) {
  if (err) {
    fs.mkdir(assetsCopy, function(err) {
      if (err) {
        return console.log(err);
      }
    });
    copyRec(pathAssets, assetsCopy);
  } else {
    copyRec(pathAssets, assetsCopy);
  }
});

function createTemplates() {
  fs.copyFile(`${__dirname}/template.html`, `${PD}/index.html`, function(err) {
    if (err) {
      throw err;
    }
    fs.readFile(`${PD}/index.html`, 'utf-8', function(err, data) {
      if (err) {
        throw err;
      }
      fs.readdir(pathFolder, {withFileTypes: true}, function(err, files) {
        if (err) {
          throw err;
        }
        files.forEach(function(file) {
          fs.readFile(`${pathFolder}/${file.name}`, 'utf-8', function(err, dataFile) {
            if (err) {
              throw err;
            }
            let tag = `{{${file.name.split('.')[0]}}}`;
            data = data.replace(tag, dataFile);
            fs.writeFile(`${PD}/index.html`, data, function(err) {
              if (err) {
                console.log(err);
              }
            });
          });
        });
      });
    });
  });
}
