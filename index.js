const fs = require("fs");
const path = require("path");


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
  const {type} = require("./SortByType.js")
}

if (options.size && myArgs < 5) {
  const { size } = require("./SortBySize.js");
}

if (options.modify && myArgs < 5) {
  const { modify } = require("./SortByTime.js");
}

if (options.name && myArgs < 5) {
  const { name } = require("./AllSortByName.js");
}

let check = process.argv.slice(2, 3).join("");

if (check == "." && check.length < 2) {
  console.log("please add option");
}

if (check == "./" && myArgs < 4) {
  console.log("please add options");
}

// switch (argWithSpace) {
//   case `${myArg} --type images,texts --name`:
//     const { type } = require("./SortByType.js");
//     const { nameImages } = require("./SortByName.js");s
//     const { nameTexts } = require("./SortByName.js");
//     break;

// }


for (var i = 0; i < 1; i++) {
  const { typeName } = require("./typename.js");
}

