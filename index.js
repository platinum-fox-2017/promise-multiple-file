const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve,reject)=>{
    fs.readFile(file, 'utf-8',function(err,data){
      if(err){
        reject(err)
      }
      else{
        let dataFile = JSON.parse(data)
        resolve(dataFile)
      }
    })
  })

}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  return new Promise ((resolve,reject)=>{

    readFilePromise(parentFileName).then(dataParent=>{
      readFilePromise(childrenFileName).then(dataChildren => {
        // console.log(dataChildren)
        for(let i=0;i<dataParent.length;i++){
          let arrOfChildren = []
          for(let j =0;j<dataChildren.length;j++){
            if(dataParent[i].last_name === dataChildren[j].family){
              arrOfChildren.push(dataChildren[j].full_name)
              dataParent[i].childerns = arrOfChildren
            }
          }
          
        }
        sleep.sleep(5)
        resolve(dataParent)
      })
      
    })
   
  })
  
}

matchParentsWithChildrens('./parents.json', './childrens.json').then(data=>{
  console.log(data)
})

console.log("Notification : Data sedang diproses !");

// readFilePromise('parents.json').then(dataFile=>{
//   console.log(dataFile)
// }).catch(err=>{
//   console.log(err)
// })
// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');

