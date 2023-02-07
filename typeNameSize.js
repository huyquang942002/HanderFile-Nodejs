

// if(process.argv.length <= 4){
//   console.log("please enter the folder you want to sort");
//   return 0;
// }

//   // ./c
//   var myArg = process.argv.slice(2,3).join("");

//   var myArgs = process.argv.slice(4).join("");

//   var str = myArgs.split(/[,-]/);
  
//   var texts = str.find((element) => element === "texts");
  
//   var images = str.find((element) => element === "images");

// // ./c
// const dir = myArg;

// function sizeToString(size) {

//     if (size <= 1024*100) {
//         return `Tiny`;
//     } else if (size > 1024 * 100 && size <= 1024 * 1024) {
//       return `small`;
//     } else if (size > 1024 * 1024 && size <= 1024 * 1024 * 5) {
//       return `medium`;
//     } else if (size > 1024 * 1024 * 5 && size < 1024 * 1024 * 10) {
//       return `Big`;
//     } else {
//       return `Verybig`;
//     }
// }

// function sortNameName(firstLetter) {
//     if (
//       firstLetter === "A" ||
//       firstLetter === "B" ||
//       firstLetter === "C" ||
//       firstLetter === "D"
//     ) {
//       return `A-D`;
//     } else if (
//       firstLetter === "E" ||
//       firstLetter === "F" ||
//       firstLetter === "G" ||
//       firstLetter === "H"
//     ) {
//       return `E-H`;
//     } else if (
//       firstLetter === "I" ||
//       firstLetter === "J" ||
//       firstLetter === "K" ||
//       firstLetter === "L"
//     ) {
//       return `I-L`;
//     } else if (
//       firstLetter === "M" ||
//       firstLetter === "N" ||
//       firstLetter === "O" ||
//       firstLetter === "P"
//     ) {
//       return `M-P`;
//     } else if(
//       firstLetter === 'Q' || 
//       firstLetter === 'R' || 
//       firstLetter === 'S' || 
//       firstLetter === 'T'
//       )  {
//       return `Q-T`;
//   }   else if(
//       firstLetter === 'U' || 
//       firstLetter === 'V' || 
//       firstLetter === 'W' || 
//       firstLetter === 'X'
//       )  {
//       return `U-X`;
//   }   else{
//       return ``;
//   }   
      
//   }

// function sortName(lastPath) {

//   if (lastPath === ".txt" || lastPath === ".docx") {
//     return `${texts}`;
//   } else if (lastPath === ".png" || lastPath === ".jpg") {
//     return `${images}`;
//   } else if (lastPath === ".sh") {
//     return `bash`;
//   }else{
//     return ``;
//   }
// }


// const typeNameSize = () => {

//  fs.readdir(dir, (err, files) => {
//     if (err) {
//       console.error(`Error reading directory ${dir}: ${err}`);
//       return;
//     }
  
//     files.forEach((file) => {
     
//         var lastPath = path.extname(file);
  
//         const sizeString = sortName(lastPath);
        
//         if (!fs.existsSync(`${dir}/${sizeString}`)) {
//            fs.mkdirSync(`${dir}/${sizeString}`);
//         }
  
//         // Di chuyển file vào thư mục chính
//         fs.copyFile(`${dir}/${file}`, `${dir}/${sizeString}/${file}`, (err) => {
  
//               var dirImages = "./c/images";
  
//               var dirTexts = "./c/texts";
  
//               fs.readdir(dirImages, (err, files) => {
//                   if (err) throw err;
                
//                   for (const file of files) {
                    
//                     const firstLetterImages = (file[0].toUpperCase());
  
//                     const sizeStringImages = sortNameName(firstLetterImages);
                
//                     if (!fs.existsSync(`${dirImages}/${sizeStringImages}`)) {
    
//                     fs.mkdirSync(`${dirImages}/${sizeStringImages}`);
    
//                     }
//                     // Di chuyển file vào thư mục chính
//                     fs.rename(`${dirImages}/${file}`, `${dirImages}/${sizeStringImages}/${file}`, (err) => {

//                         fs.readdir(`${dirImages}/${sizeStringImages}`, (err, files) => {

//                             files.forEach((file) => {
//                               // Xác định kích thước của file
//                               fs.stat(`${dirImages}/${sizeStringImages}/${file}`, (err, stat) => {
//                                 if(err){
//                                     return ;
//                                 }
//                                 // Tạo thư mục mới cho file nếu nó chưa tồn tại
//                                 const sizeStringSize = sizeToString(stat.size);
//                                 if (!fs.existsSync(`${dirImages}/${sizeStringImages}/${sizeStringSize}`)) {
//                                   fs.mkdirSync(`${dirImages}/${sizeStringImages}/${sizeStringSize}`);
//                                 }
                          
//                                 // Di chuyển file vào thư mục chính
//                                 fs.rename(`${dirImages}/${sizeStringImages}/${file}`, `${dirImages}/${sizeStringImages}/${sizeStringSize}/${file}`, (err) => {
//                                 });
//                               });
//                             });
//                           });
//                         });   
//                       }   
//                     });
  
//               fs.readdir(dirTexts, (err, files) => {
//               if (err) throw err;
              
//               for (const file of files) {
                  
//                   const firstLetterTexts = (file[0].toUpperCase());
  
//                   const sizeStringTexts = sortNameName(firstLetterTexts);
              
//                   if (!fs.existsSync(`${dirTexts}/${sizeStringTexts}`)) {
  
//                   fs.mkdirSync(`${dirTexts}/${sizeStringTexts}`);
  
//                   }
//                   // Di chuyển file vào thư mục chính
//                   fs.rename(`${dirTexts}/${file}`, `${dirTexts}/${sizeStringTexts}/${file}`, (err) => {

//                     fs.readdir(`${dirTexts}/${sizeStringTexts}`, (err, files) => {

//                         files.forEach((file) => {
//                           // Xác định kích thước của file
//                           fs.stat(`${dirTexts}/${sizeStringTexts}/${file}`, (err, stat) => {
                      
//                             // Tạo thư mục mới cho file nếu nó chưa tồn tại
//                             const sizeStringSize = sizeToString(stat.size);
//                             if (!fs.existsSync(`${dirTexts}/${sizeStringTexts}/${sizeStringSize}`)) {
//                               fs.mkdirSync(`${dirTexts}/${sizeStringTexts}/${sizeStringSize}`);
//                             }
                      
//                             // Di chuyển file vào thư mục chính
//                             fs.rename(`${dirTexts}/${sizeStringTexts}/${file}`, `${dirTexts}/${sizeStringTexts}/${sizeStringSize}/${file}`, (err) => {
//                             });
//                           });
//                         });
//                       });
//                     });  
//               }
//               });
//         });
//       });
//   });
// }



  
//   const fs = require("fs");
//   const path = require("path");
  
  
//   const { Command } = require("commander");
//   const program = new Command();
  
//   program
//     .option("--type, --type", "handle file")
//     .option("--size, --size", "handle file")
//     .option("--modify, --modify", "handle file")
//     .option("--name, --name", "handle file");
  
//   program.parse(process.argv);
  
//   const options = program.opts();
  
//   var myArgs = process.argv.length;
  
  
//   for (var i = 0; i < 1; i++) {
//     typeNameSize();
//   }
  
  


