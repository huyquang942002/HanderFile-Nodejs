const fs = require("fs");

var myArg = process.argv.slice(2, 3).join("");


var dir = myArg;


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
  } else if (
    firstLetter === "Q" ||
    firstLetter === "R" ||
    firstLetter === "S" ||
    firstLetter === "T"
  ) {
    return `Q-T`;
  } else if (
    firstLetter === "U" ||
    firstLetter === "V" ||
    firstLetter === "W" ||
    firstLetter === "X"
  ) {
    return `U-X`;
  } else {
    return ``;
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

      const firstLetter = file[0].toUpperCase();

      const sizeString = sortName(firstLetter);
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
   name,
};
