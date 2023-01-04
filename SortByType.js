
var fs = require("fs");

var path = require("path");

// Cho biết đường dẫn hiện tại
var dirPath = path.resolve(__dirname); // D:\Sprint3

var txtList;
var imgList;

var type = fs.readdir(dirPath, function (err, files) {
  txtList = files.filter(function (e) {
    return path.extname(e).toLowerCase() === ".txt";
  });

  imgList = files.filter(function (e) {
    return path.extname(e).toLowerCase() === ".jpg";
  });

  try {
    txtList.forEach((file) => {
      var source = "./" + file;
      var target = "./texts/" + file;
      fs.renameSync(source, target);
      console.log(`Moved ${source} to ${target}`);
    });

    imgList.forEach((file) => {
      var source = "./" + file;
      var target = "./images/" + file;
      fs.renameSync(source, target);
      console.log(`Moved ${source} to ${target}`);
    });

    const { move } = require("./move.js");

  } catch (err) {
    console.log(err);
  }
});



module.exports = {
  type,
};
