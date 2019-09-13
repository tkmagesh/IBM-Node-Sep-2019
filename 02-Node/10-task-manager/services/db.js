const MongoClient = require('mongodb').MongoClient;

let _db = null;

module.exports['init'] = async function init(){

	let client = await MongoClient.connect('mongodb://localhost:27017');
	_db = client.db('mydb');
	
}

module.exports['get'] = function(){
	
	return _db;
}

