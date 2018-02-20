const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise((resolve, reject)=>{
    fs.readFile(file, (err, data) => {
      if (err){
        reject (err);
      }else{
        resolve(JSON.parse(data));        
      } 
    });
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
    readFilePromise(parentFileName).then(parent_data=>{
      readFilePromise(childrenFileName).then(children_data=>{
        for(let i =0; i<parent_data.length; i++){
          parent_data[i].children = []
          for(let j =0; j<children_data.length; j++){
            if(parent_data[i].last_name ===children_data[j].family){
              parent_data[i].children.push(children_data[j].full_name)
            }
          }
        }
      console.log(parent_data)
      }).catch(err=>{
        err.message = 'terjadi error pada proses pembacaan data childrenFileName'
        console.log(err)
      })
    }).catch(err=>{
      err.message ='terjadi error pada proses pembacaan data parentFileName' 
      console.log(err)        
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');