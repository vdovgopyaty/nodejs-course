'use strict';

var express = require('express');
var tasks = require('../models/tasks');
var router = express.Router();

router.route('/tasks')
	.post(function(req, res) {
		tasks.create({
			title: req.body.title,
			date: new Date().getTime(),
			iscomplete: false
		}, function(err) {
			if (err) {
				console.log(err);
				return;
			}
			res.redirect('/tasks');
		})
	})
	.get(function(req, res) {
		tasks.read(function(err, result) {
			var day = new Date().getDay();
			var tasks = {};
			for (var i = 0; i < result.length; i++) {
				if (tasks[result[i].id] == undefined) {
					tasks[result[i].id] = {
						id: result[i].id,
						title: result[i].title,
						description: result[i].description,
						completed: result[i].completed,
						actions: [{
							action: result[i].action,
							done: result[i].done,
							date: result[i].date
						}]
					}
				} else {
					tasks[result[i].id].actions.push({
						action: result[i].action,
						done: result[i].done,
						date: result[i].date
					})
				}
			}
			console.log(day);
			res.render('tasks', {
				tasks: tasks,
				user: req.isAuthenticated() ? req.user.username : false,
				day: day
			})
		})
	});

router.route('/tasks/{id}')
	.get(function(req, res) {
		tasks.read(function(err, result) {
			console.log(err, result);
			var tasks = {};
			for (var i = 0; i < result.length; i++) {
				if (tasks[result[i].id] == undefined) {
					tasks[result[i].id] = {
						id: result[i].id,
						title: result[i].title,
						actions: [{
							date: result[i].date,
							value: result[i].value,
							done: result[i].done
						}]
					}
				} else {
					tasks[result[i].id].actions.push({
						date: result[i].date,
						value: result[i].value,
						done: result[i].done
					})
				}
			}
			res.render('tasks', {
				tasks: tasks,
				user: req.isAuthenticated() ? req.user.username : false
			})
		})
	})
	.put(function(req, res) {
		tasks.update(req.body.id, {
			title: req.body.title,
			iscomplete: req.body.iscomplete ? 1 : 0
		}, function(err) {
			if (err) {
				console.log(err);
				return;
			}
			res.redirect('/tasks');
		})
	})
	.delete(function(req, res) {
		tasks.delete(req.params.id, function(err) {
			if (err) {
				console.log(err);
				return;
			}
			res.redirect('/tasks');
		})
	});

module.exports = router;
