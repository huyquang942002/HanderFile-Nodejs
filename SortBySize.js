const fs = require("fs");

var myArg = process.argv.slice(2, 3).join("");

const dir = myArg;

function sizeToString(size) {

    if (size <= 1024*100) {
        return `Tiny`;
    } else if (size > 1024 * 100 && size <= 1024 * 1024) {
      return `small`;
    } else if (size > 1024 * 1024 && size <= 1024 * 1024 * 5) {
      return `medium`;
    } else if (size > 1024 * 1024 * 5 && size < 1024 * 1024 * 10) {
      return `Big`;
    } else {
      return `Verybig`;
    }
}

// Read the contents of the directory
var size =  fs.readdir(dir, (err, files) => {
  if (err) {
    console.error(`Error reading directory ${dir}: ${err}`);
    return;
  }

  files.forEach((file) => {
    // Xác định kích thước của file
    fs.stat(`${dir}/${file}`, (err, stat) => {
      if (err) {
        console.error(`Error getting file size for ${file}: ${err}`);
        return;
      }

      // Tạo thư mục mới cho file nếu nó chưa tồn tại
      const sizeString = sizeToString(stat.size);
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

module.exports ={
    size,
}
