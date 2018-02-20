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
  let dataPromises = [];
  dataPromises.push(readFilePromise(parentFileName))
  dataPromises.push(readFilePromise(childrenFileName))
  Promise.all(dataPromises).then((values)=>{
    let parent_data = JSON.parse(values[0]);
    let children_data = JSON.parse(values[1]);

    for (let i = 0; i < parent_data.length; i++) {
      parent_data[i].childrens = [];
      for (let j = 0; j < children_data.length; j++) {
        if (parent_data[i].last_name === children_data[j].family) {
          parent_data[i].childrens.push(children_data[j].full_name);
        }
      }
    }
    console.log(parent_data);

  }).catch((err)=>{console.log(err)});
}


matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
