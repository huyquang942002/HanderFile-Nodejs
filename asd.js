const a = process.argv.slice(3,4);

const b = process.argv.slice(4,5);

console.log(b)


for(var i = 0 ;i<process.argv.length; i++){
    if(a[i]==="--type"){
        console.log("hello world");
    }
}
  