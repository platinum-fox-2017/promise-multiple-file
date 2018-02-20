const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  const readPromise = new Promise(function(resolve, reject){
    fs.readFile(file, 'utf8', function(err, data){
      sleep.sleep(5);
      if(err) {
        reject(err);
      }
      else{
        data = JSON.parse(data)
        resolve(data);
      }
    })
  })
  return readPromise;
}

function findChildrens(parentArr, childrenArr) {
  for(let i = 0; i<parentArr.length; i++) {
    parentArr[i].childrens = [];
    for(let j=0; j<childrenArr.length; j++) {
      if(parentArr[i].last_name == childrenArr[j].family) {
        parentArr[i].childrens.push(childrenArr[j].full_name);
      }
    }
  }
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let parent_data;
  let children_data;
  readFilePromise(parentFileName)
  .then(function(data){
    parent_data = data.slice();
    return readFilePromise(childrenFileName)
  })
  .then(function(data){
    children_data = data.slice();
    findChildrens(parent_data, children_data)
    return parent_data
  })
  .then(function(data){
    console.log(data);
  })
  .catch(function(err){
    console.log(`terjadi error dalam pembacaan data.`);
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');