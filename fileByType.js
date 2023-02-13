const fs = require("fs");


const path = require("path");



for(var i = 1 ; i < process.argv.length ; i++){
    
  if(process.argv[i]==="--type"){

    if(!process.argv[i+1]){
      console.log("Please add type is : : [ images , texts , bash ]");
    }else{
      var myArgs = process.argv[i+1];

      var str = myArgs.split(/[,-]/);

      var texts = str.find((element) => element === "texts");
    
      var images = str.find((element) => element === "images");
    
      var bash = str.find((element) => element === "bash");
    
      var order = str.find((element) => element === "order");

    }
  }
}

const fileFinalType = (dir) =>{
  fs.readdir(dir,(err,files)=>{
    for(const file of files){
      const filePath = `${dir}/${file}`;

      fs.stat(filePath,(err,stat)=>{
        if(stat.isDirectory()){
          const dirChilds = filePath.split();
          for(const dirChild of dirChilds){
            fileHeadType(dirChild);
            fileMidType(dirChild);
          }
        }
      })
    }
  })
}

const fileMidType = (dir)=>{
  fs.readdir(dir,(err,files)=>{
    for(const file of files){
      const filePath = `${dir}/${file}`;

      fs.stat(filePath,(err,stat)=>{
        if(stat.isDirectory){
          const dirChilds = filePath.split();
          for(const dirChild of dirChilds){
            fileHeadType(dirChild);
          }
        }
      })
    }
  })
}


function sortName(lastPath) {

  if (lastPath === ".txt" || lastPath === ".docx") {
    return `${texts}`;
  } else if (lastPath === ".png" || lastPath === ".jpg") {
    return `${images}`;
  } else if (lastPath === ".sh") {
    return `${bash}`;
  }else if (lastPath === "") {
    return `${order}`;
  }else{
  return ``;
}
}


// Read the contents of the directory
const fileHeadType =  (dir) => {

fs.readFile(dir, (err, files) => {
  if (err) {
    console.error(`Error reading directory ${dir}: ${err}`);
    return;
  }

    const parts = dir.split("/");

    const sourceFile = parts[parts.length - 1];

    const source = parts.slice(0,parts.length-1).join("/")

    // Xác định kích thước của file
    fs.stat(`${source}/${sourceFile}`, (err, stat) => {
      if (err) {
        console.error(`Error getting file size for ${sourceFile}: ${err}`);
        return;
      }

      const parts = dir.split("/");

      const sourceFile = parts[parts.length - 1];
      
      // .txt
      var lastPath = path.extname(sourceFile);

      var sizeString = sortName(lastPath);

      if(sizeString === images || sizeString === texts || sizeString === bash){
        if (!fs.existsSync(`${source}/${sizeString}`)) {
          fs.mkdirSync(`${source}/${sizeString}`);
        }
      }


    fs.copyFile(`${source}/${sourceFile}`, `${source}/${sizeString}/${sourceFile}`,  (err) => {
      if (err) {
        console.error(`Error moving file ${sourceFile}: ${err}`);
      }
    });
    });
});

}



module.exports = {
  fileHeadType,
  fileMidType,
  fileFinalType
  };
