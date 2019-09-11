const http = require('http'),
	path = require('path'),
	logger = require('./logger'),
	serveStatic = require('./serve-static'),
	dataParser = require('./data-parser'),
	serveCalculator = require('./serve-calculator'),
	serve404 = require('./serve-404'),
	app = require('./app');

app.use(dataParser); 
app.use(logger);
app.use(serveStatic(path.join(__dirname, 'public'))); 
app.use(serveCalculator); 
app.use(serve404);

const server = http.createServer(app);

server.listen(8080);

server.on('listening', function(){
	console.log('server listening on 8080!');
});