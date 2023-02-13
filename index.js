
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


let option = []

let status = 0;


program
  .option("--type, --type <value>", "handle file")
  .option("--size, --size", "handle file")
  .option("--modify, --modify", "handle file")
  .option("--name, --name", "handle file")
  .on("option:type", async () => {
    option.push("--type");
  })
  .on("option:size", async () => {
      option.push("--size");
  })
  .on("option:modify", async () => {
      option.push("--modify");
  })
  .on("option:name", async () => {
      option.push("--name");
  })

var src = process.argv.slice(2,3).join("");

var src1 = process.argv.slice(3,4).join("");


program.parse(process.argv);

const options = program.opts();

var myArgs = process.argv.length;



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


const checkType1 = (type)=> {
  if (type === "images" || type === "texts" || type === "bash" || type ==="order") {
    return true;
  } else {
    console.log("Please add valid type is : [ images , texts , bash ]");
  }
}

const checkType = ()=>{

for(var i = 1 ; i<process.argv.length;i++){
  if(process.argv[i]=="--type"){
      var a = process.argv[i+1];

      if(a==null){
        console.log("Please add type is : : [ images , texts , bash ]")
      }else{
        var b = a.split(',');
        b.forEach((x)=>{
          checkType1(x)
        })
      }
    }
}
}

checkType();


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


const runType = async (checkIndex,src)=>{
    switch(checkIndex){

      case 0: await folderType.getHeadType(src);
      break;

      case 1: await setTimeout(()=>{
        folderType.getMidType(src)
      },100) 
      break;

      case 2: await setTimeout(()=>{
        folderType.getFinalType(src)
      },200) 
      break;

      default:
        break;
    }
}

const runName = async (checkIndex,src)=>{
  switch(checkIndex){

    case 0: await folderName.getHeadName(src);
    break;

    case 1: await setTimeout(()=>{
      folderName.getMidName(src);
    },100) 
    break;

    case 2: await setTimeout(()=>{
      folderName.getFinalName(src);
    },100) 
    break;

    default:
      break;
  }
}

const runSize = async (checkIndex,src)=>{
  switch(checkIndex){

    case 0: await folderSize.getHeadSize(src);
    break;

    case 1: await setTimeout(()=>{
      folderSize.getMidSize(src);
    },100) 
    break;

    case 2: await setTimeout(()=>{
      folderSize.getFinalSize(src);
    },100) 
    break;

    default:
      break;
  }
}

const runModify = async (checkIndex,src)=>{
  switch(checkIndex){

    case 0: await folderModify.getHeadModify(src);
    break;

    case 1: await setTimeout(()=>{
      folderModify.getMidModify(src);
    },100) 
    break;

    case 2: await setTimeout(()=>{
      folderModify.getFinalModify(src);
    },100) 
    break;

    default:
      break;
  }
}

const start = async ()=>{

for (const item of option) {
  switch (item) {
      case "--type":
          console.log(status);
          await runType(status, src)
          break;
      case "--modify":
          console.log(status);
          await runModify(status, src)
          break;
      case "--name":
          console.log(status);  
          await runName(status, src)
          break;
      case "--size":
          console.log(status);
          await runSize(status, src)
          break;
      default:
          console.log(status);
          break;
  }
  status++
}
}

start();

