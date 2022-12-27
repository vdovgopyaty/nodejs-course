'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	data = require('./data/data.js'),
	server;

console.log(data());

var store = {
	home: {
		page: 'Home',
		content: 'Home, sweet home'
	},
	about: {
		page: 'About',
		content: 'About'
	},
	download: {
		page: 'Download',
		content: 'Download'
	},
	profile: {
		page: 'Profile',
		content: 'Profile'
	}
};

var storeKeys = Object.keys(store);

app.disable('x-powered-by');
app.set('view engine', 'jade');

app.use(function(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extends: true}));

app.route('/')
	.get(function(req, res) {
		res.render('main', {
			page: 'Новости',
			data: data(),
			links: storeKeys
		});
	})
	.post(function(req, res) {
	});

app.route('/new')
	.get(function(req, res) {
		res.render('new', {
			page: 'Add New',
			links: storeKeys
		});
	})
	.post(function(req, res) {
		var data = req.body;
		if (data.pageurl && data.pagename && data.pagecontent) {
			store[data.pageurl] = {
				page: data.pagename,
				content: data.pagecontent
			};
			storeKeys = Object.keys(store);
		};
		res.redirect('/');
	});

app.get('/:page?', function(req, res) {
	var page = req.params.page, data;
	if (!page) {
		page = 'home';
	};
	data = store[page];
	if (!data) {
		res.redirect('/');
		return;
	};
	data.links = storeKeys;
	console.log(req.params);
	res.render('main', data);
})

server = app.listen(3000, function() {
	console.log('Listening on port 3000');
});