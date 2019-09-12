let taskList = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Master Node.js', isCompleted : false},
	{id : 3, name : 'Explore Bangalore', isCompleted : true}
];

function getAll(){
	return [...taskList];
}

function get(taskId){
	let result = taskList.find(task => task.id === taskId);
	return result;
}

function addNew(newTaskData){
	const newTaskId = taskList.reduce((result, task) => result > task.id ? result : task.id, 0) + 1,
		newTask = {...newTaskData, id : newTaskId};
	taskList.push(newTask);
	return newTask;
}

function update(taskIdToUpdate, updatedTask){
	if (taskList.find(task => task.id === taskIdToUpdate)){
		taskList = taskList.map(task => task.id === taskIdToUpdate ? updatedTask : task);
		return updatedTask;
	} else {
		return null;
	}
}

function remove(taskIdToDelete){
	if (taskList.find(task => task.id === taskIdToDelete)){
		taskList = taskList.filter(task => task.id !== taskIdToDelete);
		return true;
	} else {
		return false;
	}
}

module.exports = { getAll, get, addNew, update, remove };