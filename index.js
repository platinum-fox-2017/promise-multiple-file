const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(data) {
  return new Promise ((resolve,reject)=>{
    fs.readFile(data,'UTF-8', (err,readData)=>{
      if(readData){
        let parse = JSON.parse(readData)
        resolve(parse)
      }else{
        reject(`terjadi error pada saat pembacaan data`)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  return new Promise ((resolve,reject)=>{
    readFilePromise(parentFileName).then((parentData)=>{
      readFilePromise(childrenFileName).then((childrenData)=>{
        let hasil = []
        parentData.forEach(each=>{
          let tmp = []
          childrenData.forEach(eachChildren=>{
            if(each.last_name === eachChildren.family){
              tmp.push(eachChildren.full_name)
            }
          })
          each['children'] = tmp
          hasil.push(each)
        })
          resolve(hasil)
      })
    }).catch((err)=>{reject(err)})
  })  
}

// matchParentsWithChildrens('./parents.json', './childrens.json').then((data)=>{
//   console.log(data)
// })
// console.log("Notification : Data sedang diproses !");
// sleep.sleep(1)

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json').then(()=>{

}).catch((err)=>{console.log(err)})
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json').then(()=>{

}).catch((err)=>{console.log(err)})