for(var i = 1 ; i < process.argv.length ; i++){
    if(process.argv[i]==="--type"){
      var myArgs = process.argv[i+1];
      console.log(myArgs);
    }
  }