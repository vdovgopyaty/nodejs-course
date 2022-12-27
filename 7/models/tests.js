'use strict';

var db = require('../libs/connection');

var Test = {
	read: function(id, callback) {
		db.query('SELECT test.id, test.title ' +
		         'FROM test' +
		         'WHERE test.id = ?', id, callback);
	},
	add: function(id, callback) {
		db.query('INSERT INTO test SET ?', id, callback);
	},
	list: function(callback) {
		db.query('SELECT test.id, test.title ' +
		         'FROM test', callback);
	},
	update: function(id, title, callback) {
		var sql = 'UPDATE test SET title = ? WHERE id = ?';
		db.query(sql, [
			test.title,
			parseInt(id)
		], callback);
	},
	delete: function(id, callback) {
		connection.query('DELETE FROM test WHERE id = ?', id, callback);
	}
};

module.exports = Test;