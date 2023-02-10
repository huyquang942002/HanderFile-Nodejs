const fs = require("fs");



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
const fileName = (dir)=>{

 fs.readFile(dir, (err, file) => {
  if (err) {
    console.error(`Error reading directory ${dir}: ${err}`);
    return;
  }

      const parts = dir.split("/");

      const sourceFile = parts[parts.length - 1];

      const source = parts.slice(0,parts.length-1).join("/")

      const firstLetter = sourceFile[0].toUpperCase();
      
      const sizeString = sortName(firstLetter);

        if (!fs.existsSync(`${source}/${sizeString}`)) {
          fs.mkdirSync(`${source}/${sizeString}`);
        }

      fs.copyFile(`${source}/${sourceFile}`, `${source}/${sizeString}/${sourceFile}`,  (err) => {
        if (err) {
          console.error(`Error moving file ${sourceFile}: ${err}`);
        }
      });
});
}

module.exports = {
  fileName ,
}

