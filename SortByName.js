const fs = require("fs");

const dir = "./category/images";

const dir1 = "./category/texts";



function sortName(firstLetter) {
  if (
    firstLetter === "A" ||
    firstLetter === "B" ||
    firstLetter === "C" ||
    firstLetter === "D"
  ) {
    return `A-D`;
  } else if (
    firstLetter === "E" ||
    firstLetter === "F" ||
    firstLetter === "G" ||
    firstLetter === "H"
  ) {
    return `E-H`;
  } else if (
    firstLetter === "I" ||
    firstLetter === "J" ||
    firstLetter === "K" ||
    firstLetter === "L"
  ) {
    return `I-L`;
  } else if (
    firstLetter === "M" ||
    firstLetter === "N" ||
    firstLetter === "O" ||
    firstLetter === "P"
  ) {
    return `M-P`;
  } else if(
    firstLetter === 'Q' || 
    firstLetter === 'R' || 
    firstLetter === 'S' || 
    firstLetter === 'T'
    )  {
    return `Q-T`;
}   else if(
    firstLetter === 'U' || 
    firstLetter === 'V' || 
    firstLetter === 'W' || 
    firstLetter === 'X'
    )  {
    return `U-X`;
}   else{
    return ``;
}   
    
}

// Read the contents of the directory
var nameImages = fs.readdir(dir, (err, files) => {
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

      const firstLetter = (file[0].toUpperCase());

          const sizeString = sortName(firstLetter);
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

var nameTexts = fs.readdir(dir1, (err, files) => {
  if (err) {
    console.error(`Error reading directory ${dir1}: ${err}`);
    return;
  }

  files.forEach((file) => {
    // Xác định kích thước của file
    fs.stat(`${dir1}/${file}`, (err, stat) => {
      if (err) {
        console.error(`Error getting file size for ${file}: ${err}`);
        return;
      }

      const firstLetter = file[0].toUpperCase();

      const sizeString = sortName(firstLetter);
      if (!fs.existsSync(`${dir1}/${sizeString}`)) {
        fs.mkdirSync(`${dir1}/${sizeString}`);
      }

      // Di chuyển file vào thư mục chính
      fs.copyFile(`${dir1}/${file}`, `${dir1}/${sizeString}/${file}`, (err) => {
        if (err) {
          console.error(`Error moving file ${file}: ${err}`);
        }
      });
    });
  });
});

module.exports = {
  nameImages,
  nameTexts,
};
