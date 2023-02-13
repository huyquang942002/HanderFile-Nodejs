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

const getFinalModify = (dir)=>{
  fs.readdir(dir,(err,files)=>{
    for(const file of files){
      const filePath = `${dir}/${file}`;

      fs.stat(filePath,(err,stat)=>{
        if(stat.isDirectory()){
            getHeadModify(filePath);
            getMidModify(filePath);
        }
      })
    }
  })
}

const getMidModify = (dir)=>{
  fs.readdir(dir,(err,files)=>{
    for(const file of files){
      const filePath = `${dir}/${file}`;

      fs.stat(filePath,(err,stat)=>{
        if(stat.isDirectory()){
            getHeadModify(filePath);
        }
      })
    }
  })
}

// Read the contents of the directory
const  getHeadModify = (dir)=>{

 fs.readdir(dir, (err, files) => {
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
      
      if(!stat.isDirectory()){
        if (!fs.existsSync(`${dir}/${sizeString}`)) {
          fs.mkdirSync(`${dir}/${sizeString}`);
        }
      }

      // Di chuyển file vào thư mục chính
      fs.rename(`${dir}/${file}`, `${dir}/${sizeString}/${file}`,  (err) => {
        if (err) {
          console.error(`Error moving file ${file}: ${err}`);
        }
      });
    });
  });
});
}

module.exports = {
  getHeadModify : getHeadModify,
  getMidModify : getMidModify,
  getFinalModify : getFinalModify,
};
