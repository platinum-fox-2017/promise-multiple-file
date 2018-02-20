const fs = require('fs');
//var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise(function(resolve, reject){
    fs.readFile(file, 'UTF-8', function(err, data){
      if(err) reject(err);
      resolve(JSON.parse(data));
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
    .then(function(data){
      console.log(data);
    })
    .catch(function(err){
      console.log(err);
    })
  readFilePromise(childrenFileName)
    .then(function(data){
      console.log(data);
    })
    .catch(function(err){
      console.log(err);
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');