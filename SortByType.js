const fs = require("fs");

const path = require("path");

if(process.argv.length <= 4){
  console.log("please enter the folder you want to sort");
  return 0;
}

  // Folder need handle
  var myArg = process.argv.slice(2,3).join("");

  var myArgs = process.argv.slice(4).join("");

  var str = myArgs.split(/[,-]/);
  
  
  var texts = str.find((element) => element === "texts");
  
  var images = str.find((element) => element === "images");


const dir = myArg;

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
var type = fs.readdir(dir, (err, files) => {
  if (err) {
    console.error(`Error reading directory ${dir}: ${err}`);
    return;
  }

  files.forEach((file) => {
    // Get full information of file
    fs.stat(`${dir}/${file}`, (err, stat) => {
      if (err) {
        console.error(`Error getting file size for ${file}: ${err}`);
        return;
      }

      const lastPath = path.extname(file);

      const sizeString = sortName(lastPath);
      if (!fs.existsSync(`${dir}/${sizeString}`)) {
        fs.mkdirSync(`${dir}/${sizeString}`);
      }

      // Di chuyển file vào thư mục chính
      fs.copyFile(`${dir}/${file}`, `${dir}/${sizeString}/${file}`, (err) => {
        if (err) {
          console.error(`Error moving file ${file}: ${err}`);
        }
      });
    });
  });
});

module.exports = {
  type,
};
