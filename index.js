const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise(function(resolve, reject){
    sleep.sleep(5)
    fs.readFile(file,function(err, data){
      if(err){
        reject('terjadi error pada proses pembacaan file')
      }
      else{
        var parseData = JSON.parse(data)
        resolve(parseData)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)

  readFilePromise(parentFileName).then(function(parentData){
    readFilePromise(childrenFileName).then(function(childrenData){
      var arrData = []
      for(let i=0; i<parentData.length; i++){
        var childrens = []
        for(let j=0; j<childrenData.length; j++){
          
          if(parentData[i].last_name == childrenData[j].family){
            childrens.push(childrenData[j].full_name)
          }
          
        }
        parentData[i].childrens = childrens
        arrData.push(parentData[i])
      }
      console.log(arrData)
    }).catch(function(err){
      console.log(err)
    })
  }).catch(function(err){
    console.log(err)
  })
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');