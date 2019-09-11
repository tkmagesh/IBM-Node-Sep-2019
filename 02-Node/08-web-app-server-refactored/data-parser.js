const url = require('url');

module.exports = function(req){

	let urlObj = url.parse(req.url);
	req['urlObj'] = urlObj;
}