const express = require('express'),
	router = express.Router(),
	taskService = require('../services/taskService');



/*router.get('/', function(req, res, next){
	taskService
		.getAll()
		.then(function(taskList){
			res.json(taskList);
		})
		.catch(function(err){
			next(err);
		})
});*/

/*router.get('/', function(req, res, next){
	let taskList = taskService.getAll();
	res.json(taskList);
});*/

router.get('/', async function(req, res, next){
	let taskList = await taskService.getAll();
	res.json(taskList);
});

router.get('/:id', async function(req, res, next){
	let requestedTaskId = parseInt(req.params.id);
	let result = await taskService.get(requestedTaskId);
	if (result){
		res.json(result)
	} else {
		res.status(404).end();
	}
});

router.post('/', async function(req, res, next){
	req.session['taskCount'] = req.session['taskCount'] || 0;
	++req.session.taskCount;
	const newTaskData = req.body;
	let newTask = await taskService.addNew(newTaskData);
	res.status(201).json(newTask);
})

router.put('/:id', async function(req, res, next){
	let taskIdToUpdate = parseInt(req.params.id);
		updatedTaskData = req.body;
	let updatedTask = await taskService.update(taskIdToUpdate,updatedTaskData);
	if (updatedTask){
		res.status(200).json(updatedTask);
	} else {
		res.status(404).end();
	}
})

router.delete('/:id', async function(req, res, next){
	let taskIdToDelete = parseInt(req.params.id);
	if (await taskService.remove(taskIdToDelete)) {
		res.status(200).end();
	} else {
		res.status(404).end();
	}
});

router.get('/count', function(req, res, next){
	res.json({ count : req.session.taskCount});
});

module.exports = router;