const fs = require('fs');
//var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise(function(resolve, reject){
    fs.readFile(file, 'UTF-8', function(err, data){
      if(err) {
        let msg = 'Terjadi error pada proses pembacaan data';
        reject(msg);
      }else{
        resolve(JSON.parse(data));
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
    .then(function(dataParent){
      for(let i=0; i<dataParent.length; i++){
        dataParent[i].childrens = [];
      }
      readFilePromise(childrenFileName)
        .then(function(dataChildren){
          for(let i=0; i<dataChildren.length; i++){
            for(let j=0; j<dataParent.length; j++){
              if(dataChildren[i].family == dataParent[j].last_name){
                dataParent[j].childrens.push(dataChildren[i].full_name)
              }
            }
          }
          console.log(dataParent);
        })
        .catch(function(err){
          console.log(err);
        })
    })
    .catch(function(err){
      console.log(err);
    })
  
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');