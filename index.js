const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(parentFileName, childrenFileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(parentFileName, 'UTF-8', (errParent, dataParent) => {
      if (errParent) {
        reject(errParent)
      } else {
        fs.readFile(childrenFileName, 'UTF-8', (errChild, dataChild) => {
          if (errChild) {
            reject(errChild)
          } else {
            convertDataParent = JSON.parse(dataParent)
            convertDataChild = JSON.parse(dataChild)
            let dataExport = { convertDataParent, convertDataChild }
            resolve(dataExport)
          }
        })
      }
      
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName, childrenFileName).then(result => {
    let dataFamily = []
    for (let i = 0; i < result.convertDataParent.length; i++) {
      result.convertDataParent[i].childrens = []
    }

    for (let i = 0; i < result.convertDataParent.length; i++) {
      for (let j = 0; j < result.convertDataChild.length; j++) {
        if (result.convertDataChild[j].family === result.convertDataParent[i].last_name) {
          result.convertDataParent[i].childrens.push(result.convertDataChild[j].full_name)
      }
      }
    }
    sleep.sleep(5)
    console.log(result.convertDataParent)
  }).catch(err => {
    console.log('Terjadi error pada prosess pembacaan data.');
    
  })
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');