const express = require('express'),
	router = express.Router();

const taskList = [
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

module.exports = router;