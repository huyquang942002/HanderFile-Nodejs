const fs = require("fs");

const fss = require("fs-extra");


const today = new Date();

const thisWeek = new Date();
thisWeek.setDate(today.getDate() - today.getDay() + 1);

const thisMonth = new Date();
thisMonth.setDate(1);

const thisYear = new Date();
thisYear.setMonth(0, 1);



function sort(mtime) {
    if (mtime <= today && mtime > thisWeek) {
    return `today`;
  } else if (mtime <= thisWeek && mtime > thisMonth) {
    return `this_week`;
  } else if (mtime <= thisMonth && mtime > thisYear) {
    return `this_month`;
  } else if (mtime <= thisYear) {
    return `this_year`;
  } else {
    return ``;
  }
}


// Read the contents of the directory
const  fileModify = (dir)=>{

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

      // Tạo thư mục mới cho file nếu nó chưa tồn tại
      const sizeString = sort(stat.mtime);

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
    fileModify,
};
