const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  return new Promise((resolve,reject) => {
    fs.readFile(fileName, 'utf8', (err,data)=>{
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // read parents
  let parent_data =[];
  readFilePromise(parentFileName)
    .then((data)=>{
      sleep.sleep(5);
      parent_data = JSON.parse(data);
      console.log(`file ${parentFileName} read!`);
      // read childrens data
      return readFilePromise(childrenFileName)
      })
    .then((data2)=>{
      sleep.sleep(5);
      let children_data = JSON.parse(data2);
      console.log(`file ${childrenFileName} read!`);

      for (let i = 0; i < parent_data.length; i++) {
        parent_data[i].childrens = [];
        for (let j = 0; j < children_data.length; j++) {
          if (parent_data[i].last_name === children_data[j].family) {
            parent_data[i].childrens.push(children_data[j].full_name);
          }
        }
      }
      console.log(parent_data);

      })
    .catch((err)=>{
      console.log(err);
      console.log('Terjadi error pada proses pembacaan data');
      });
}


matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
