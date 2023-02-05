const fs = require('fs');

var dirImages = "./c/images";


fs.readdir(dirImages, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    console.log(file);
  }
});
