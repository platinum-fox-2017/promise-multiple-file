const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'UTF8', (err, data) => {
      if (err) {
        reject('Terjadi error pada proses pembacaan data');
      } else {
        resolve(data)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(function (data) {
  let parentData = JSON.parse(data)
    readFilePromise(childrenFileName)
    .then(function (data) {
    let childrenData = JSON.parse(data)
      for(let i=0; i<parentData.length; i++) {
        parentData[i].childrens = []
        for(let j=0; j<childrenData.length; j++) {
          if(parentData[i].last_name == childrenData[j].family) {
            parentData[i].childrens.push(childrenData[j].full_name)
          }
        }
      }
      console.log(parentData);
    })
    .catch(function (err) {
      console.log(err);
    })
  })
  .catch(function (err) {
    console.log(err);
  })
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
// console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
