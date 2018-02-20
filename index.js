const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(input) {
  return readFile = new Promise(function(resolve, reject){
    fs.readFile(input, 'UTF-8', function(err, data){
      if(err){
        console.log(err);
      } else {
        resolve(JSON.parse(data));
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
  .then(function(parentsData){
    sleep.sleep(5);
    readFilePromise(childrenFileName).then(function(childrensData){
      for(let i=0; i<parentsData.length; i++){
        parentsData[i].childrens = [];
        for(let j=0; j<childrensData.length; j++){
          if(parentsData[i].last_name===childrensData[j].family){
            parentsData[i].childrens.push(childrensData[j].full_name);
          }
        }
      }
      console.log(parentsData);
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
