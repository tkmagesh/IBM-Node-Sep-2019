const fs = require('fs'),
	path = require('path');

const staticResExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
	const resExtn = path.extname(resourceName);
	return staticResExtns.indexOf(resExtn) >= 0;
}

module.exports = function(req, res){
	let resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;

	if (isStatic(resourceName)){
		const resourceFullName = path.join(__dirname, resourceName);

		if (!fs.existsSync(resourceFullName)){
			res.statusCode = 404;
			res.end();
			return;
		}
		const stream = fs.createReadStream(resourceFullName);
		stream.pipe(res);
	} 
};