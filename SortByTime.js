const fs = require("fs");

const today = new Date();

const thisWeek = new Date();
thisWeek.setDate(today.getDate() - today.getDay() + 1);

const thisMonth = new Date();
thisMonth.setDate(1);

const thisYear = new Date();
thisYear.setMonth(0, 1);



const dir = "./category";

function sort(mtime) {
  // console.log('mtime : ' + mtime)
  if (mtime <= today && mtime > thisWeek) {
    // console.log("today : " + today);
    return `today`;
  } else if (mtime <= thisWeek && mtime > thisMonth) {
    // console.log("thiswek : " + thisWeek);
    return `this_week`;
  } else if (mtime <= thisMonth && mtime > thisYear) {
    // console.log("month : " + thisMonth);
    return `this_month`;
  } else if (mtime <= thisYear) {
    // console.log("year : " + thisYear);
    return `this_year`;
  } else {
    return ``;
  }
}

// Read the contents of the directory
var modify = fs.readdir(dir, (err, files) => {
  if (err) {
    console.error(`Error reading directory ${dir}: ${err}`);
    return;
  }

  files.forEach((file) => {
    // Lấy thông tin file
    fs.stat(`${dir}/${file}`, (err, stat) => {
      if (err) {
        console.error(`Error getting information file  for ${file}: ${err}`);
        return;
      }

      // Tạo thư mục mới theo ngày tuần tháng năm
      const sizeString = sort(stat.mtime);
      
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
  modify,
};
