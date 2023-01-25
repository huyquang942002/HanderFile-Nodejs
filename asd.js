
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --arg <arg>", "A string argument with spaces")
  .action((options) => {
    console.log(options.arg)
  });


const argWithSpace = process.argv.slice(2).join(" ");
console.log(argWithSpace);


