let fs = require('fs');
let path = require('path');
let writeText = fs.WriteStream(path.join(__dirname, 'text.txt'));
let { stdout, stdin, exit } = require('process');

stdout.write('привет! введите текст:');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    endFunction();
  }
  writeText.write(data);
});
process.on('signt', endFunction);
function endFunction() {
  stdout.write('до свидания!\n');//Если вы не поместите строку прерывания в конце(\n), вы получите странный символ после строки, что-то вроде этого:%
  exit();
}