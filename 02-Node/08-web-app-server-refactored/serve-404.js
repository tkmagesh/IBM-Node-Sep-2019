module.exports = function(req, res, next){
	if (!res.finished){
		console.log('[@serve-404] - serving 404');
		res.statusCode = 404;
		res.end();
	}
	next();
}