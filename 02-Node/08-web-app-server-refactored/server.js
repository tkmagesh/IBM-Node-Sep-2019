const http = require('http'),
	serveStatic = require('./serve-static'),
	dataParser = require('./data-parser'),
	serveCalculator = require('./serve-calculator'),
	serve404 = require('./serve-404');

const server = http.createServer(function(req, res){
	console.log(`${req.method}\t${req.url}`);
	dataParser(req);
	serveStatic(req, res);
	serveCalculator(req, res);
	serve404(res);
});

server.listen(8080);

server.on('listening', function(){
	console.log('server listening on 8080!');
});