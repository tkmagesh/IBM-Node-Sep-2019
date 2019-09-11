const calculator = require('./calculator'),
	querystring = require('querystring');

module.exports = function(req, res, next){
 	if (req.urlObj.pathname === '/calculator'){
		let data = req.method === 'GET' ? req.queryData : req.bodyData,
			x = parseInt(data.x),
			y = parseInt(data.y),
			op = data.op,
			result = calculator[op](x,y);
		res.write(result.toString());
		res.end();
		next();
	} else {
		next();
	}
}