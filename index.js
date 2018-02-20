const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise((resolve, reject)=>{
    fs.readFile(file, 'utf8', (err,data)=>{
      if(err) {
        console.log(`Terjadi error pada proses pembacaan data`)
        reject (err)
      }
      // console.log(data)
      let dataArr = JSON.parse(data)
      resolve(dataArr)
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName).then(parent_data => {
    readFilePromise(childrenFileName)
    .then(children_data => {
      for(let i = 0; i < parent_data.length; i++) {
        parent_data[i].childrens = []
        for(let j = 0; j < children_data.length; j++) {
          if(parent_data[i].last_name === children_data[j].family) {
            parent_data[i].childrens.push(children_data[j].full_name)
          }
        }
      }
      console.log(parent_data)
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

// // for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');