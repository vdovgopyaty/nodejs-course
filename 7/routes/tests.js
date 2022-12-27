'use strict';

var express = require('express');
var tests = require('../models/tests');
var router = express.Router();

router.route('/tests')
	.post(function(req, res) {
		tests.create({
			title: req.body.title
		}, function(err) {
			if (err) {
				console.log(err);
				return;
			}
			res.redirect('/tests');
		})
	})
	.get(function(req, res) {
		tests.read(function(err, result) {
			var tests = {};
			for (var i = 0; i < result.length; i++) {
				if (tests[result[i].id] == undefined) {
					tests[result[i].id] = {
						id: result[i].id,
						title: result[i].title
					}
				} else {
					tests[result[i].id].actions.push({
						date: result[i].date,
						value: result[i].value,
						done: result[i].done
					})
				}
			}
			res.render('tests', {
				tests: tests
			})
		})
	});

router.route('/tests/{id}')
	.get(function(req, res) {
		tests.read(function(err, result) {
			res.render('tests', {
				tests: result
			})
		})
	})
	.put(function(req, res) {
		tests.update(req.body.id, {
			title: req.body.title,
			iscomplete: req.body.iscomplete ? 1 : 0
		}, function(err) {
			if (err) {
				console.log(err);
				return;
			}
			res.redirect('/tests');
		})
	})
	.delete(function(req, res) {
		tests.delete(req.params.id, function(err) {
			if (err) {
				console.log(err);
				return;
			}
			res.redirect('/tests');
		})
	});

module.exports = router;
