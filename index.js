const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve,reject)=>{
    fs.readFile(file,'utf8',(err,data)=>{
      err ? reject(`error at:${file}`) : resolve(JSON.parse(data));
    });
  });
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  return new Promise((resolve,reject)=>{
    readFilePromise(parentFileName).then((parent_data)=>{
      readFilePromise(childrenFileName).then((children_data)=>{
        parent_data.map((v,i,a)=>{
          v.children =[]
        });
        parent_data.forEach((v)=>{
          children_data.forEach((v2)=>{
            if(v.last_name === v2.family)v.children.push(v2.full_name);
          });
        });
        sleep.sleep(5);
        resolve(parent_data);
      }).catch((err)=> console.log(err))
    }).catch((err)=> console.log(err))
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json').then((data)=> console.log(data));
// console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './AGNY_a_real_file.json')
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');