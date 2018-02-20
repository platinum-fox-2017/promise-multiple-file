const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  let myPromise = new Promise(function(resolve,reject){
    sleep.sleep(5);
    var jsonData = [];
    fs.readFile(fileName,'utf-8',function(err,data){
      if (err) {
        let message = "Terjadi error pada proses pembacaan data";
        reject(message);
      } else {
        jsonData = JSON.parse(data);
        resolve(jsonData);
      }
    })


  })

  return myPromise;
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
  .then(function(data1){
    readFilePromise(childrenFileName)
    .then(function(data2){
      var jsonReturn = [];
      for(let i = 0; i < data1.length;i++) {
        let children = []
        for(let j = 0; j < data2.length;j++) {
          if(data1[i].last_name == data2[j].family){
            children.push(data2[j].full_name);
          }
        }
        data1[i].children = children
        jsonReturn.push(data1[i]);
      }
      console.log(jsonReturn);
    })
    .catch(function(error){
      console.log(error);
    })
  })
  .catch(function(error){
    console.log(error);
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// // for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');