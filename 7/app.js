'use strict';

var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var passport = require('passport');
var config = require('./config');
var routes = require('./routes');

var app = express();

app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	layoutsDir: __dirname + '/views/layouts',
	partialsDir: [
		__dirname + '/views/partials'
	],
	helpers: {}
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'nF8Fy$x%9&D3PXe' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.use(function(req, res) {
	res.status(404);

	// respond with html page
	if (req.accepts('html')) {
		res.render('404', {
			layout: 'error',
			url: req.url
		});
		return;
	}

	// respond with json
	if (req.accepts('json')) {
		res.send({ error: 'Not found' });
		return;
	}

	// default to plain-text. send()
	res.type('txt').send('Not found');
});

if (app.get('env') == 'development') {
	app.use(errorHandler());
}

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

app.listen(config.get('port'), function() {
	console.log('Listening on port', config.get('port'));
});
