const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        let datafile = JSON.parse(data)
        resolve(datafile)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let parent_data = []
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName).then((data) => {
    readFilePromise(childrenFileName).then((data2) => {
      for (let x = 0; x < data.length; x++) {
        parent_data.push(data[x])
        parent_data[x].childrens = []
        for (let y = 0; y < data2.length; y++) {
          if (data2[y].family === data[x].last_name) {
            parent_data[x].childrens.push(data2[y].full_name)
          }
        }
      }
      console.log(parent_data);
    }).catch((err1) => {
      console.log(err1);
    })
  }).catch((err2) => {
    console.log(err2);
  })
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
// console.log("Notification : Data sedang diproses !");
// sleep.sleep(5)

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');