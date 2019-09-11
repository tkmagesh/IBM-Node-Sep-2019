const url = require('url');

module.exports = function(req, res, next){

	let urlObj = url.parse(req.url);
	req['urlObj'] = urlObj;
	next();
}