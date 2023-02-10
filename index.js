
const  a = require("./SortBySize.js")
const  b  = require("./fileByName.js");
const  c  = require("./fileByTime.js");
const  d  = require("./fileByType.js");


var src = process.argv.slice(2,3).join("");

const { Command } = require("commander");
const program = new Command();

program
  .option("--type, --type", "handle file")
  .option("--size, --size", "handle file")
  .option("--modify, --modify", "handle file")
  .option("--name, --name", "handle file");

program.parse(process.argv);

const options = program.opts();

var myArgs = process.argv.length;

if (options.type && myArgs <= 5) {
  d.fileType(src);
}

if (options.size && myArgs < 5) {
  d.fileSize(src);
}

if (options.modify && myArgs < 5) {
  c.fileModify(src);
}

if (options.name && myArgs < 5) {
    b.fileName(src);
}

let check = process.argv.slice(2, 3).join("");

if (check == "." && check.length < 2) {
  console.log("please add option");
}

if (check == "./" && myArgs < 4) {
  console.log("please add options");
}





