
const myArgs = process.argv.slice(2);

console.log(myArgs[1]);

// var typeString;

// function func(myArgs, i, size) {
//   //Điều kiện dừng đệ quy
//   if (i < size) {
//     if (myArgs.length > 1) {
//       //images,texts
//       typeString = myArgs[1].slice(6);

//       if (myArgs[i] == "--type" + typeString) {
//         return type;
//       }

//       if (myArgs[i] == "--name") return "name Completed";
//     } else {
//       if (myArgs[i] == "." || myArgs[i] == "./") return "Please add option";
//     }
//   } else {
//     return "Incorrect command";
//   }

//   return func(myArgs, i + 1, size);
// }
// console.log(func(myArgs, 0, myArgs.length));



// module.exports = {
//   typeString,
// };
