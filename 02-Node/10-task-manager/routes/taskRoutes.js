const express = require('express'),
	router = express.Router(),
	taskService = require('../services/taskService');



router.get('/', function(req, res, next){
	const taskList = taskService.getAll();
	res.json(taskList);
});

router.get('/:id', function(req, res, next){
	let requestedTaskId = parseInt(req.params.id);
	let result = taskService.get(requestedTaskId);
	if (result){
		res.json(result)
	} else {
		res.status(404).end();
	}
});

router.post('/', function(req, res, next){
	const newTaskData = req.body;
	let newTask = taskService.addNew(newTaskData);
	res.status(201).json(newTask);
})

router.put('/:id', function(req, res, next){
	let taskIdToUpdate = parseInt(req.params.id);
		updatedTaskData = req.body;
	let updatedTask = taskService.update(taskIdToUpdate,updatedTaskData);
	if (updatedTask){
		res.status(200).json(updatedTask);
	} else {
		res.status(404).end();
	}
})

router.delete('/:id', function(req, res, next){
	let taskIdToDelete = parseInt(req.params.id);
	if (taskService.remove(taskIdToDelete)) {
		res.status(200).end();
	} else {
		res.status(404).end();
	}
})

module.exports = router;