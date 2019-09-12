const express = require('express'),
	router = express.Router();

let taskList = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Master Node.js', isCompleted : false},
	{id : 3, name : 'Explore Bangalore', isCompleted : true}
];

router.get('/', function(req, res, next){
	res.json(taskList);
});

router.get('/:id', function(req, res, next){
	let requestedTaskId = parseInt(req.params.id);
	let result = taskList.find(task => task.id === requestedTaskId);
	if (result){
		res.json(result)
	} else {
		res.status(404).end();
	}
});

router.post('/', function(req, res, next){
	const newTaskData = req.body,
		newTaskId = taskList.reduce((result, task) => result > task.id ? result : task.id, 0) + 1,
		newTask = {...newTaskData, id : newTaskId};
	taskList.push(newTask);
	res.status(201).json(newTask);
})

router.put('/:id', function(req, res, next){
	let taskIdToUpdate = parseInt(req.params.id);
		updatedTask = req.body;
	if (taskList.find(task => task.id === taskIdToUpdate)){
		taskList = taskList.map(task => task.id === taskIdToUpdate ? updatedTask : task);
		res.status(200).json(updatedTask);
	} else {
		res.status(404).end();
	}
})

router.delete('/:id', function(req, res, next){
	let taskIdToDelete = parseInt(req.params.id);
	if (taskList.find(task => task.id === taskIdToDelete)){
		taskList = taskList.filter(task => task.id !== taskIdToDelete);
		res.status(200).end();
	} else {
		res.status(404).end();
	}
})

module.exports = router;