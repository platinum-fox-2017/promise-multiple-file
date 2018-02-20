const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file_name) {
  // psst, the promise should be around here...
  let readPromise = new Promise(function(resolve,reject){
     fs.readFile(file_name, 'utf8',function(err,data){
         // sleep.sleep(5);
         if(err)
            reject(err);
        else
            resolve(data);
     })
  });

  return readPromise;
}


function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)

  Promise.all([readFilePromise(parentFileName), readFilePromise(childrenFileName)])
    .then(function(values){
        let parent_data = JSON.parse(values[0]);
        let childrens = JSON.parse(values[1]);
        for(let i = 0; i < parent_data.length; i++){
            parent_data[i].childrens = new Array();
            for(let j = 0; j < childrens.length; j++){
                if(parent_data[i].last_name == childrens[j].family){
                    parent_data[i].childrens.push(childrens[j].full_name);
                }
            }
        }
        console.log(parent_data);
    })
    .catch(function(err){
        console.log("Terjadi Error pada proses pembacaan data");
        console.log(err);
    });
}




// USING PROMISE CHAINING

// function matchParentsWithChildrens(parentFileName, childrenFileName) {
//   // your code here... (p.s. readFilePromise function(s) should be around here..)
//   let parent_data = new Array();
//   readFilePromise(parentFileName)
//     .then(function(data){
//         parent_data = JSON.parse(data);
//         return readFilePromise(childrenFileName)
//     })
//     .then(function(data2){
//             let childrens = JSON.parse(data2);
//             for(let i = 0; i < parent_data.length; i++){
//                 parent_data[i].childrens = new Array();
//                 for(let j = 0; j < childrens.length; j++){
//                     if(parent_data[i].last_name == childrens[j].family){
//                         parent_data[i].childrens.push(childrens[j].full_name);
//                     }
//                 }
//             }
//             console.log(parent_data);
//     })
//     .catch(function(err){
//         console.log("Terjadi Error pada proses pembacaan data");
//         console.log(err);
//     });
// }



// USING NESTED PROMISE

// function matchParentsWithChildrens(parentFileName, childrenFileName) {
//   // your code here... (p.s. readFilePromise function(s) should be around here..)
//   readFilePromise(parentFileName)
//     .then(function(data){
//         let parent_data = JSON.parse(data);
//         readFilePromise(childrenFileName)
//         .then(function(data2){
//             let childrens = JSON.parse(data2);
//             for(let i = 0; i < parent_data.length; i++){
//                 parent_data[i].childrens = new Array();
//                 for(let j = 0; j < childrens.length; j++){
//                     if(parent_data[i].last_name == childrens[j].family){
//                         parent_data[i].childrens.push(childrens[j].full_name);
//                     }
//                 }
//             }
//             console.log(parent_data);
//         })
//         .catch(function(err){
//             console.log("Terjadi Error pada proses pembacaan data");
//             console.log(err);
//         });
//     })
//     .catch(function(err){
//         console.log("Terjadi Error pada proses pembacaan data");
//         console.log(err);
//     });
// }

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
