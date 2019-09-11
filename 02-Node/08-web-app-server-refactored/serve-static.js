const fs = require('fs'),
	path = require('path');

const staticResExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
	const resExtn = path.extname(resourceName);
	return staticResExtns.indexOf(resExtn) >= 0;
}

module.exports = function(publicResPath){
	return function(req, res, next){
		let resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;

		if (isStatic(resourceName)){
			const resourceFullName = path.join(publicResPath, resourceName);

			if (!fs.existsSync(resourceFullName)){
				res.statusCode = 404;
				res.end();
				return;
			}
			const stream = fs.createReadStream(resourceFullName);
			stream.pipe(res);
			stream.on('end', next);
		} else {
			next();
		}
	};
}