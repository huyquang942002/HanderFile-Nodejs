
const  fileSize = require("./fileBySize.js")
const  fileName  = require("./fileByName.js");
const  fileModify  = require("./fileByTime.js");
const  fileType  = require("./fileByType.js");

const  folderSize = require("./SortBySize.js")
const  folderName  = require("./SortByName.js");
const  folderModify  = require("./SortByTime.js");
const  folderType  = require("./SortByType.js");




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

var src = process.argv.slice(2,3).join("");

var src1 = process.argv.slice(3,4).join("");

const parts = src.split("/");

// ./c/asd.txt => ./c
const source = parts.slice(0,parts.length-1).join("/")

// ./c/asd.txt => asd.txt
const sourceFile = parts[parts.length - 1];

if(sourceFile.includes('.')){
    if (options.type) {
      fileType.fileType(src);
    }

    if (options.size) {
      fileSize.fileSize(src);
    }

    if (options.modify) {
      fileModify.fileModify(src);
    }

    if (options.name) {
        fileName.fileName(src);
    }
}


// ./folder/file not have --type
if(myArgs >2 && sourceFile.includes('.') && !src1){
  console.log("Please add options")
}

// ./folder not have --type
if(myArgs > 2 && !sourceFile.includes('.') && !src1){
  console.log("please add options")
}



if(!src){
  console.log("please add input")
}


function checkType(type) {
  if (type === "images" || type === "texts" || type === "bash" || type ==="order") {
    return true;
  } else {
    console.log("Please add valid type is : [ images , texts , bash ]");
  }
}

// handle folder and file

for(var i = 1 ; i<process.argv.length;i++){
  if(process.argv[i]=="--type"){
      var a = process.argv[i+1];

      if(a==null){
        console.log("Please add type is : : [ images , texts , bash ]")
      }else{
        var b = a.split(',');
        b.forEach((x)=>{
          checkType(x)
        })
      }

      
    }
}

var count = 0;

for(var i = 0 ;i<process.argv.length; i++){
  if(process.argv[i]==="--name"){
    count++;
  }

  if(process.argv[i]==="--size"){
    count++;
  }

  if(process.argv[i]==="--modify"){
    count++;
  }

  if(process.argv[i]==="--type"){
    count++;
  }

  if(count > 3){
    console.log("Just input up to 3 options")
    process.exit(0);
  }
}


