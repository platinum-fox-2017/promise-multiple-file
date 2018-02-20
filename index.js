const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise(function(resolve,reject){
    fs.readFile(file,'utf-8',function(err,data){
      if(err){
        reject(err)
      }else{
        resolve(JSON.parse(data))
      }
    });
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
  .then(function(data){
    readFilePromise(childrenFileName)
    .then(function(data2){
      for(let i=0;i<data.length;i++){
        var anak=[]
        for(let j=0;j<data2.length;j++){
          if(data[i].last_name===data2[j].family){
            anak.push(data2[j].full_name)
          }
        }
        data[i].childrens=anak
      }
      console.log(data);
    }).catch(function(err){
      console.log("error bro => "+err);
    })
  })
  .catch(function(err){
    console.log("error bro => "+err);
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json')
console.log("Notification : Data sedang diproses !");
sleep.sleep(5)
// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json')
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json')
