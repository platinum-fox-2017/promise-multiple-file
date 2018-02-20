const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(filejson) {
  return new Promise((resolve, reject)=>{
    fs.readFile(filejson, 'utf8', (err,data)=>{
      if(err) {
        console.log(err)
        reject (err)
      }
      // console.log(data)
      let dataArr = JSON.parse(data)
      resolve(dataArr)
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName).then(dataParent => {
    readFilePromise(childrenFileName)
    .then(dataChildren => {
      for(let i = 0; i < dataParent.length; i++) {
        dataParent[i].childrens = []
        for(let j = 0; j < dataChildren.length; j++) {
          if(dataParent[i].last_name === dataChildren[j].family) {
            dataParent[i].childrens.push(dataChildren[j].full_name)
          }
        }
      }
      console.log(dataParent)
    })
    .catch(err =>{
      console.log(err)
    })
  }).catch(err =>{
    console.log(err)
    })
}


matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
