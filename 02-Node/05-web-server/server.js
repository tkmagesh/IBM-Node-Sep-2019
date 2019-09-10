const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url');
/*
req -> IncomingMessage extending ReadableStream
res -> ServerResponse extending WritableStream
*/

const server = http.createServer(function(req, res){
	console.log(`${req.method}\t${req.url}`);
	let urlObj = url.parse(req.url);
	let resourceName = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname,
		resourceFullName = path.join(__dirname, resourceName);

	if (!fs.existsSync(resourceFullName)){
		res.statusCode = 404;
		res.end();
		return;
	}
	const stream = fs.createReadStream(resourceFullName);
	stream.pipe(res);
});

server.listen(8080);

server.on('listening', function(){
	console.log('server listening on 8080!');
});