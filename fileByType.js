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


// Read the contents of the directory
const fileType =  (dir) => {

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

      var lastPath = path.extname(sourceFile);

      var sizeString = sortName(lastPath);

      if (!fs.existsSync(`${source}/${sizeString}`)) {
        fs.mkdirSync(`${source}/${sizeString}`);
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
    fileType,
  };
