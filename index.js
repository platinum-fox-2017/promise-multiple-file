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
  let readFileParent = readFilePromise(parentFileName);
  let readFileChildren = readFilePromise(childrenFileName);
  Promise.all([readFileParent,readFileChildren])
    .then((values) => {
      parents = values[0];
      childrens = values[1];
      //add childrens property to parent object
      for (var i = 0; i < parents.length; i++) {
        parents[i].childrens = [];
      }
      for (var i = 0; i < parents.length; i++) {
        for (var j = 0; j < childrens.length; j++) {
          if(childrens[j].family == parents[i].last_name){
            parents[i].childrens.push(childrens[j].full_name);
          }
        }
      }
      console.log(parents);
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// // for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
