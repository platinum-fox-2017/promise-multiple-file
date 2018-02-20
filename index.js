const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise ((res,rej)=> {
    fs.readFile(file,'utf-8',(err,dataFile) => {
      if(err) {
        rej(err)
      } else {
        let data = JSON.parse(dataFile)
        res(data)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  return new Promise ((res,rej) => {
    readFilePromise(parentFileName).then(parent => {
      readFilePromise(childrenFileName).then(child => {
        for(let i = 0; i < parent.length; i++) {
          parent[i].children = []
          for(let j = 0; j < child.length; j++) {
            if(parent[i].last_name === child[j].family) {
              parent[i].children.push(child[j].full_name)
            }
          }
        }
        sleep.sleep(5)
        res(parent)
        // sleep.sleep(5)
      }).catch(err => {
        err.Message = 'Terjadi error pada proses pembacaan data children'
        console.log(err);
      })
    }).catch(err => {
      err.Message = 'Terjadi error pada proses pembacaan pada kedua data'
      console.log(err);
    })
  })
}

// matchParentsWithChildrens('./parents.json', './childrens.json').then(datanya => {
//   console.log(datanya);
// })
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
