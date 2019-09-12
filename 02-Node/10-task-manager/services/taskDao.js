const path = require('path'),
	fs = require('fs');

const dataFile = path.join(__dirname, '../db/taskdb.json')

function readData(callback){
	fs.readFile(dataFile, { encoding : 'utf-8'}, function(err, fileContents){
		if (err) callback(err, null);
		let taskList = JSON.parse(fileContents);
		return callback(null, taskList);
	})
}

module.exports = { readData };