const fs = require("fs");

const path = require('path');

exports.getAllfolder = (dir)=>{

fs.readdir(dir, function (err, files) {
    for (const file of files) {
      const filePath = `${dir}/${file}`;
      fs.stat(filePath, function (err, stats) {
        if (stats.isDirectory()) {

          const dirChilds = filePath.split(); 

          dirChilds.forEach((dirChild)=>{

            console.log(dirChild);

              size(`${dirChild}`)

              getAllfolder1(dirChild)

          })

        }
      });
    }
  });
}

const getAllfolder1 = (dir)=>{

  fs.readdir(dir, function (err, files) {
      for (const file of files) {
        const filePath = `${dir}/${file}`;
        fs.stat(filePath, function (err, stats) {
          if (stats.isDirectory()) {
  
            const dirChilds = filePath.split(); 
  
            dirChilds.forEach((dirChild)=>{
  
              console.log(dirChild);
  
                size(`${dirChild}`)
  
            })
  
          }
        });
      }
    });
  }


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
const size = (dir) => {

 fs.readdir(dir, (err, files) => {
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
}







