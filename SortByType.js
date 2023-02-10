const fs = require("fs");

const fss= require("fs-extra");


const path = require("path");


  // ./c

  var myArgs = process.argv.slice(4).join("");

  var str = myArgs.split(/[,-]/);
  
  var texts = str.find((element) => element === "texts");

  var images = str.find((element) => element === "images");

// ./c


function sortName(lastPath) {

  if (lastPath === ".txt" || lastPath === ".docx") {
    return `${texts}`;
  } else if (lastPath === ".png" || lastPath === ".jpg") {
    return `${images}`;
  } else if (lastPath === ".sh") {
    return `bash`;
  }else{
    return ``;
  }
}

const getFinalType = (dir) =>{
  fs.readdir(dir,(err,files)=>{
    for(const file of files){
      const filePath = `${dir}/${file}`;

      fs.stat(filePath,(err,stat)=>{
        if(stat.isDirectory()){
          const dirChilds = filePath.split();
          for(const dirChild of dirChilds){
            getHeadType(dirChild);
            getMidType(dirChild);
          }
        }
      })
    }
  })
}

const getMidType = (dir)=>{
  fs.readdir(dir,(err,files)=>{
    for(const file of files){
      const filePath = `${dir}/${file}`;

      fs.stat(filePath,(err,stat)=>{
        if(stat.isDirectory){
          const dirChilds = filePath.split();
          for(const dirChild of dirChilds){
            getHeadType(dirChild);
          }
        }
      })
    }
  })
}

// Read the contents of the directory
const getHeadType =  (dir) => {

fs.readdir(dir, (err, files) => {
  if (err) {
    console.error(`Error reading directory ${dir}: ${err}`);
    return;
  }

  files.forEach((file) => {

   fs.stat(`${dir}/${file}`,(err,stat)=>{
    if (err) {
      console.error(`Error getting information file  for ${file}: ${err}`);
      return;
    }
    var lastPath = path.extname(file);

    var sizeString = sortName(lastPath);
    
    if(!stat.isDirectory()){
      if (!fs.existsSync(`${dir}/${sizeString}`)) {
        fs.mkdirSync(`${dir}/${sizeString}`);
      }
    }
    
    // Di chuyển file vào thư mục chính
    fs.copyFile(`${dir}/${file}`, `${dir}/${sizeString}/${file}`, (err) => {
    });
  });
})
});
}


module.exports = {
  getHeadType,
  getMidType,
  getFinalType
};
