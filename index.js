const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise (function (resolve,reject) {
    fs.readFile(file,'utf-8',function (err,data) {
      if (err) {
        reject (err)
      } else {
        let hasil = JSON.parse(data)
        resolve (hasil)
      }
    })
  })
}

function matchParentsWithChildrens (parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  return new Promise (function (resolve,reject) {
    readFilePromise (parentFileName).then (function (parent) {
      readFilePromise (childrenFileName).then (function (child) {
        for(let i = 0; i < parent.length; i++) {
          parent[i].children = []
          for(let j = 0; j < child.length; j++) {
            if (parent[i].last_name === child[j].family) {
              parent[i].children.push(child[j].full_name)
            }
          }
        }
        sleep.sleep(2)
        resolve (parent)
      }).catch(function (err) {
        err.Message = 'error pada data children'
        console.log(err);
      })
    }).catch(function (err) {
      err.Message = 'error pada data parent'
      console.log (err);
    })
  })
}

// matchParentsWithChildrens('./parents.json', './childrens.json').then(result => {
//   console.log(result);
// })
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
