const http = require('http'),
	path = require('path'),
	url = require('url'),
	calculator = require('./calculator'),
	querystring = require('querystring');

const server = http.createServer(function(req, res){
	console.log(`${req.method}\t${req.url}`);
	let urlObj = url.parse(req.url);
	let resourceName = urlObj.pathname;

	if (resourceName === '/calculator' && req.method === 'GET'){
		let queryData = querystring.parse(urlObj.query),
			x = parseInt(queryData.x),
			y = parseInt(queryData.y),
			op = queryData.op,
			result = calculator[op](x,y);
		res.write(result.toString());
		res.end();
	} if (resourceName === '/calculator' && req.method === 'POST'){
		let rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			let bodyData = querystring.parse(rawData),
				x = parseInt(bodyData.x),
				y = parseInt(bodyData.y),
				op = bodyData.op,
				result = calculator[op](x,y);
			res.write(result.toString());
			res.end();	
		})
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8085);

server.on('listening', function(){
	console.log('app server listening on 8085!');
});