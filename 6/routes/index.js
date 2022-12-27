'use strict';

var express = require('express');
var tasks = require('../models/tasks');
var login = require('../models/login');
var users = require('../models/users');
var router = express.Router();

var mustBeAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/');
	}
};

router.get('/', function(req, res) {
	res.redirect('/list');
});

router.get('/user', mustBeAuthenticated, function(req, res) {
	users.read({
		username: req.params.username
	}, function(err, result) {
		if (err) {
			console.log(err);
			return;
		}
		res.render('user', {
			users: result,
			user: req.user.username
		})
	})
});

router.get('/test', mustBeAuthenticated, function(req, res) {
	res.render('list', {
		user: req.user.username
	});
});

router.route('/signin')
	.get(function(req, res) {
		if (!req.isAuthenticated()) {
			res.render('signin');
		} else {
			res.redirect('/user');
		}
	})
	.post(login.user);

router.get('/signout', function(req, res) {
	req.logout();
	res.redirect('/signin');
});

router.route('/signup')
	.get(function(req, res) {
		if (!req.isAuthenticated()) {
			res.render('signup');
		} else {
			res.redirect('/user');
		}
	})
	.post(function(req, res) {
		console.log(res.code);
		if (req.body.password == req.body.repassword) {
			users.create({
				username: req.body.username,
				password: req.body.password
			}, function(err) {
				if (err) {
					console.log(err);
					return;
				}
				res.redirect('/signin');
			})
		} else {
			res.redirect('/signup');
		}
	});

router.get('/list', function(req, res) {
	tasks.list(function(err, result) {
		res.render('list', {
			tasks: result,
			user: req.isAuthenticated() ? req.user.username : false
		})
	})
});

router.post('/add', function(req, res) {
	tasks.add({
		title: req.body.title,
		date: new Date().getTime(),
		iscomplete: false
	}, function(err) {
		if (err) {
			console.log(err);
			return;
		}
		res.redirect('/list');
	})
});

router.post('/update', function(req, res) {
	tasks.update(req.body.id, {
		title: req.body.title,
		iscomplete: req.body.iscomplete ? 1 : 0
	}, function(err) {
		if (err) {
			console.log(err);
			return;
		}
		res.redirect('/list');
	})
});

router.get('/delete/:id', function(req, res) {
	tasks.delete(req.params.id, function(err) {
		if (err) {
			console.log(err);
			return;
		}
		res.redirect('/list');
	})
});

module.exports = router;

// user: req.isAuthenticated() ? req.user.username : false