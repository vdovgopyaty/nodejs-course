'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var md5 = require('md5');
var db = require('../libs/connection');

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},
	function(username, password, done) {
		db.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return done(err);
			}
			var sql = "SELECT * FROM users WHERE username = ?";
			connection.query(sql, username, function(err, result) {
				if (result) {
					if (result[0].password != md5(password)) {
						return done(null, false, {message: 'неверный пароль'});
					}
					console.log(result);
					return done(null, result[0]);
				}
				connection.query(sql, function(err, result) {
					if (err) throw err;
					done(null, result[0]);
				});
			});
		});
	}
));

var Login = {
	user: passport.authenticate(
		'local', {
			successRedirect: '/',
			failureRedirect: '/signin'
		}
	)
};

module.exports = Login;