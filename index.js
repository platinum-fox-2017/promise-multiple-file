const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(filename) {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, 'utf8', function (err, data) {
			if (err) reject(err);
			else resolve(JSON.parse(data));
		});
    });
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
	Promise.all([readFilePromise(parentFileName), readFilePromise(childrenFileName)])
  	 .then(values => {
  	 	sleep.sleep(5);
  	 	values[0].forEach(parents => {
  	 		let child = [];
  	 		values[1].forEach(childrens => {
  	 			if (parents.last_name == childrens.family) child.push(childrens.full_name);
  	 		});
  	 		parents.childrens = child;
  	 	});

  	 	console.log(values[0]);
  	 })
  	 .catch(error => {
  	 	sleep.sleep(5);
  	 	console.log('Terjadi error pada proses pembacaan data.')
  	 });
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');