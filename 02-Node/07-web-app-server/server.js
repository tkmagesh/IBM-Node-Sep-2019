const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	calculator = require('./calculator'),
	querystring = require('querystring');

const staticResExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
	const resExtn = path.extname(resourceName);
	return staticResExtns.indexOf(resExtn) >= 0;
}

const server = http.createServer(function(req, res){
	console.log(`${req.method}\t${req.url}`);
	let urlObj = url.parse(req.url);
	let resourceName = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname;

	if (isStatic(resourceName)){
		const resourceFullName = path.join(__dirname, resourceName);

		if (!fs.existsSync(resourceFullName)){
			res.statusCode = 404;
			res.end();
			return;
		}
		const stream = fs.createReadStream(resourceFullName);
		stream.pipe(res);
	} else if (resourceName === '/calculator' && req.method === 'GET'){
		let queryData = querystring.parse(urlObj.query),
			x = parseInt(queryData.x),
			y = parseInt(queryData.y),
			op = queryData.op,
			result = calculator[op](x,y);
		res.write(result.toString());
		res.end();
	} else if (resourceName === '/calculator' && req.method === 'POST'){
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

server.listen(8080);

server.on('listening', function(){
	console.log('server listening on 8080!');
});