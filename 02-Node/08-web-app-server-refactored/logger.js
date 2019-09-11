const chalk = require('chalk');
module.exports = function(req, res, next){
	let logMessage = `${chalk.red(req.method)}\t${req.urlObj.pathname.padEnd(20, ' ')}`;
	let startTime = new Date();
	res.on('finish', function(){
		let endTime = new Date(),
			delta = endTime - startTime;
		console.log(`${logMessage}\t${chalk.green(res.statusCode)}\t${chalk.bgYellow(delta)}ms`);
	});
	next();
}