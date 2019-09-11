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

module.exports = router;