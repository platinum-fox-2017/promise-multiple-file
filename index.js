// import { resolve } from 'path';

const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return readFile = new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject('Terjadi error pada proses pembacaan data')
      else {
        resolve(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)

  readFilePromise(parentFileName)
  .then(parent_data => {
    // sleep.sleep(5)
    readFilePromise(childrenFileName).then(children_data => {
      for (let j = 0; j < parent_data.length; j++){
        parent_data[j].childrens = []
      }
      for (let i = 0; i < children_data.length; i++){
        switch (children_data[i].family){
          case 'Campbell': parent_data[0].childrens.push(children_data[i].full_name); break;
          case 'Katsev': parent_data[1].childrens.push(children_data[i].full_name); break;
          case 'Robin': parent_data[2].childrens.push(children_data[i].full_name); break;
          case 'Oliver': parent_data[3].childrens.push(children_data[i].full_name); break;
          case 'Wood': parent_data[4].childrens.push(children_data[i].full_name); break;
          case 'Bass': parent_data[5].childrens.push(children_data[i].full_name); break;
          case 'Caldwell': parent_data[6].childrens.push(children_data[i].full_name); break;
        }
      }
      console.log(parent_data)
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');