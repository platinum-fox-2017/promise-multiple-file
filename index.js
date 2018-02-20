const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      }
      else {
        let arr_data = JSON.parse(data)
        resolve(arr_data)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  return new Promise(function (resolve, reject) {
    readFilePromise(parentFileName).then(function (parent) {
      readFilePromise(childrenFileName).then(function (children) {
        for (var i = 0; i < parent.length; i++) {
          parent[i].childrens = []
          for (var j = 0; j < children.length; j++) {
            if (children[j].family === parent[i].last_name) {
              parent[i].childrens.push(children[j].full_name)
            }
          }
        }
        sleep.sleep(5)
        resolve(parent)
      }).catch(function (err) {
        console.log('ini error parent: '+err);
      })
    }).catch(function (err2) {
      console.log('ini error child: '+err2);
    })
  })
}


matchParentsWithChildrens('./parents.json', './childrens.json').then(function (result) {
  console.log(result);
})


console.log("Notification : Data sedang diproses !");
//
// // for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
