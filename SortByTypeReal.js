const fs = require("fs");
const path = require("path");
const dir = "./category";

function sortName(lastPath) {
  if(lastPath === ".txt"){
    return `texts`
  }
  else if (lastPath === ".png" || lastPath === ".jpg"){
    return `images`
  }
  else{
    return `Order`
  }
}

// Read the contents of the directory
var name = fs.readdir(dir, (err, files) => {
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

      const lastPath = path.extname(file);
      console.log(lastPath);

      const sizeString = sortName(lastPath);
      if (!fs.existsSync(`${dir}/${sizeString}`)) {
        fs.mkdirSync(`${dir}/${sizeString}`);
      }

      // Di chuyển file vào thư mục chính
      fs.rename(`${dir}/${file}`, `${dir}/${sizeString}/${file}`, (err) => {
        if (err) {
          console.error(`Error moving file ${file}: ${err}`);
        }
      });
    });
  });
});

module.exports = {
  name,
};
