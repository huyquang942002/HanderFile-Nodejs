



let check = process.argv.slice(2, 3).join("");

if (check == "." && check.length < 2) {
  console.log("please add option");
}

if (check == "./" && check.length <= 2) {
  console.log("please add options");
}
