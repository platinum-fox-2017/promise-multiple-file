const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  // psst, the promise should be around here...
  const promise = new Promise((resolve,reject) => {
    fs.readFile(fileName,'utf8',(err,data) => {
      if (err) {
        reject(err);
      } else {
        data = JSON.parse(data);
        resolve(data);
      }
    });
  })
  return promise;
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let parents;
  let childrens;
  readFilePromise(parentFileName)
    .then((data) => {
      parents = data;
      for (var i = 0; i < parents.length; i++) {
        parents[i].childrens = [];
      }
      return readFilePromise(childrenFileName)
    })
    .then((data) => {
      childrens = data;
      for (var i = 0; i < parents.length; i++) {
        for (var j = 0; j < childrens.length; j++) {
          if(childrens[j].family == parents[i].last_name){
            parents[i].childrens.push(childrens[j].full_name);
          }
        }
      }
      console.log(parents);
    })
    .catch((err) => {
    console.log('Terjadi Error Saat Proses Pembacaan Data');
    console.log(err);
  });
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// // for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
