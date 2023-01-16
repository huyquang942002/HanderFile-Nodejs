const { Command } = require("commander");
const program = new Command();

program
  .option("--type, --type", "handle file")
  .option("--size, --size", "handle file")
  .option("--modify, --modify", "handle file")
  .option("--name, --name", "handle file"); 

program.parse(process.argv)

const options = program.opts();

if(options.type){
  const { type } = require("./SortByType.js");
}

if (options.size) {
  const { size } = require("./SortBySize.js");
}

if (options.modify) {
  const { modify } = require("./SortByTime.js");
}

if (options.name) {
  const { nameImages } = require("./SortByName.js");
  const { nameTexts } = require("./SortByName.js");
}


let check = process.argv.slice(2, 3).join("");

if (check == "." && check.length < 2) {
  console.log("please add option");
}

if (check == "./" && check.length <= 2) {
  console.log("please add options");
}












