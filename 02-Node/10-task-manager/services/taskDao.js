/*const path = require('path'),
	fs = require('fs');

const dataFile = path.join(__dirname, '../db/taskdb.json')

function readData(){
	var p = new Promise(function(resolveFn, rejectFn){
		fs.readFile(dataFile, { encoding : 'utf-8'}, function(err, fileContents){
			if (err) return rejectFn(err);
			let taskList = JSON.parse(fileContents);
			resolveFn(taskList);
		})
	});
	return p;
}

function saveData(taskList){
	return new Promise(function(resolveFn, rejectFn){
		fs.writeFile(dataFile,  JSON.stringify(taskList), { encoding : 'utf8'}, function(err, result){
			if (err) return rejectFn(err);
			resolveFn(result);
		});
	});
}*/

var dbApi = require('./db')



async function readData(){
	var db = dbApi.get();
	let tasks = await db.collection('tasks').find({}).toArray();
	return tasks;
}

async function saveData(){

}

module.exports = { readData, saveData };