const fs = require('fs');
const path = require('path');
const get = fs.ReadStream(path.join(__dirname, 'text.txt'));

let data = '';
get.on('data', partData => data += partData);
get.on('end', () => process.stdout.write(data)); 
//get.on('end', () => console.log(data));
//stdout.write непрерывно печатает информацию в качестве извлекаемых данных и не добавляет новую строку. console.log печатает информацию, полученную в точке извлечения, и добавляет новую строку.
