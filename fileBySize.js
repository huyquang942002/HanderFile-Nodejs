const fs = require("fs");



function sizeToString(size) {

    if (size <= 1024*100) {
        return `Tiny`;
    } else if (size > 1024 * 100 && size <= 1024 * 1024) {
      return `small`;
    } else if (size > 1024 * 1024 && size <= 1024 * 1024 * 5) {
      return `medium`;
    } else if (size > 1024 * 1024 * 5 && size < 1024 * 1024 * 10) {
      return `Big`;
    } else if (size >= 1024 * 1024 * 10){
      return `Verybig`;
    }else{
      return ``;
    }
}

// Read the contents of the directory
const fileSize = (dir) => {

 fs.readFile(dir, (err, file) => {
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

      // Tạo thư mục mới cho file nếu nó chưa tồn tại
      const sizeString = sizeToString(stat.size);

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
    fileSize,
}


 
 
 
 
 
 
 
 






