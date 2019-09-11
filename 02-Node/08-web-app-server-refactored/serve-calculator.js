const calculator = require('./calculator'),
	querystring = require('querystring');

module.exports = function(req, res){
 	if (req.urlObj.pathname === '/calculator' && req.method === 'GET'){
		let queryData = querystring.parse(req.urlObj.query),
			x = parseInt(queryData.x),
			y = parseInt(queryData.y),
			op = queryData.op,
			result = calculator[op](x,y);
		res.write(result.toString());
		res.end();
	} else if (req.urlObj.pathname === '/calculator' && req.method === 'POST'){
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
	} 
}