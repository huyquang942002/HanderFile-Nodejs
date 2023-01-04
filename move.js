const fs = require("fs");

function move(){

// directory to check if exists
const dir = "./category/images";
const dir1 = "./category/texts";

// check if directory exists
if (fs.existsSync(dir) || fs.existsSync(dir1)) {
  console.log("Folder leaved");
} else {
  var source = "./images";
  var target = "./category/images";

  var source1 = "./texts";
  var target1 = "./category/texts";

  try {
    fs.renameSync(source, target);
    console.log(`Moved ${source} to ${target}`);

    fs.renameSync(source1, target1);
    console.log(`Moved ${source1} to ${target1}`);
  } catch (err) {
    console.log(err);
  }
}
}

module.exports = {
  move:move()
};

