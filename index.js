const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise((resolve,reject)=>{
    fs.readFile(file,'utf-8',(err,data)=>{
      if(err)  {
        reject('terjadi erorr pada proses pembacaan data')
      } else {
        data = JSON.parse(data)
        resolve(data)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName).then(function(parentData){
    readFilePromise(childrenFileName).then(function(childrenData){
      for(let i = 0 ; i < parentData.length; i++){
        parentData[i]['childrens'] = []
        for(let j =0 ; j < childrenData.length ; j++){
          if(parentData[i].last_name === childrenData[j].family){
            parentData[i].childrens.push(childrenData[j].full_name)
          }
        }
      }
      sleep.sleep(5)
      console.log(parentData)
    }).catch(err=>{
      console.log(err)
    })
  }).catch(err=>{
    console.log(err)
  })
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');