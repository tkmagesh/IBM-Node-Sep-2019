var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taskRouter = require('./routes/taskRoutes');
var sessionService = require('./services/sessionService');
var db = require('./services/db');


async function appInit(){
	await db.init();


	var app = express();
	app.set('env', 'production');



	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'hbs');

	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(function(req, res, next){
		if (req.headers['session-id']){
			let existing_session = sessionService.getSession(req.headers['session-id'])
			if (!existing_session){
				let newSessionId = sessionService.createNew();
				res.setHeader('session-id', newSessionId);
				req['session'] = sessionService.getSession(newSessionId);
			}
		} else {
			let newSessionId = sessionService.createNew();
			res.setHeader('session-id', newSessionId);
			req['session'] = sessionService.getSession(newSessionId);
		}
		next();
	})
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/', indexRouter);
	app.use('/users', usersRouter);
	app.use('/tasks', taskRouter);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  next(createError(404));
	});

	// error handler
	app.use(function(err, req, res, next) {
	  // set locals, only providing error in development
	  res.locals.message = err.message;
	  res.locals.error = req.app.get('env') === 'development' ? err : {};

	  // render the error page
	  res.status(err.status || 500);
	  res.render('error');
	});
	return app;
}

module.exports = appInit;
