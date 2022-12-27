'use strict';

var db = require('../libs/connection');
var md5 = require('md5');

var Users = {
	read: function(username, callback) {
		db.query('SELECT id, username FROM users WHERE username = ?', username, callback);
	},

	create: function(user, callback) {
		var sql = 'INSERT INTO users SET username = ?, password = ?';
		db.query(sql, [
			user.username,
			md5(user.password)
		], callback);
	},

	update: function(username, id, callback) {
		var sql = 'UPDATE users SET username = ? WHERE id = ?';
		db.query(sql, [
			user.username,
			parseInt(id)
		], callback);
	},

	delete: function(id, callback) {
		connection.query('DELETE FROM users WHERE id = ?', id, callback);
	}
};

module.exports = Users;