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
  /*
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
  */
    // using promise all
    let parent = readFilePromise(parentFileName)
    let children = readFilePromise(childrenFileName)
    Promise.all([parent, children]).then(data=>{
      for(let i =0; i<data[0].length; i++){
        data[0][i].children = []
        for(let j =0; j<data[1].length; j++){
          if(data[0][i].last_name ===data[1][j].family){
            data[0][i].children.push(data[1][j].full_name)
          }
        }
      }
      console.log(data[0])      
    }).catch(err=>{
      err.message = 'terjadi error pada proses pembacaan data'
      console.log(err)
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');