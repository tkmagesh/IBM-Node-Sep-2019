const taskDao = require('./taskDao');



/*function getAll(callback){
	taskDao.readData(function(err, taskList){
		callback(err, taskList);
	})
}*/

function getAll(){
	return taskDao.readData();
}

async function get(taskId){
	let taskList = await taskDao.readData();
	let result = taskList.find(task => task.id === taskId);
	return result;
}

async function addNew(newTaskData){
	let taskList = await taskDao.readData();
	const newTaskId = taskList.reduce((result, task) => result > task.id ? result : task.id, 0) + 1,
		newTask = {...newTaskData, id : newTaskId};
	taskList.push(newTask);
	await taskDao.saveData(taskList);
	return newTask;
}

async function update(taskIdToUpdate, updatedTask){
	let taskList = await taskDao.readData();
	if (taskList.find(task => task.id === taskIdToUpdate)){
		taskList = taskList.map(task => task.id === taskIdToUpdate ? updatedTask : task);
		await taskDao.saveData(taskList);
		return updatedTask;
	} else {
		return null;
	}
}

async function remove(taskIdToDelete){
	let taskList = await taskDao.readData();
	if (taskList.find(task => task.id === taskIdToDelete)){
		taskList = taskList.filter(task => task.id !== taskIdToDelete);
		await taskDao.saveData(taskList);
		return true;
	} else {
		return false;
	}
}

module.exports = { getAll, get, addNew, update, remove };