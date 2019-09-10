const http = require('http'),
	fs = require('fs');
/*
req -> IncomingMessage extending ReadableStream
res -> ServerResponse extending WritableStream
*/

const server = http.createServer(function(req, res){
	console.log(`${req.method}\t${req.url}`);
	
	const fileContents = fs.readFileSync('./index.html');
	res.write(fileContents);
	res.end();
});

server.listen(8080);

server.on('listening', function(){
	console.log('server listening on 8080!');
});