'use strict';

var db = require('../libs/connection');

var Tasks = {
	list: function(callback) {
		db.query('SELECT * FROM tasks', callback);
	},

	add: function(task, callback) {
		db.query('INSERT INTO tasks SET ?', task, callback);
	},

	update: function(id, task, callback) {
		var sql = 'UPDATE tasks SET title = ?, description = ?, regularity = ? WHERE id = ?';
		db.query(sql, [
			task.title,
			task.description,
			task.regularity,
			parseInt(id)
		], callback);
	},

	delete: function(id, callback) {
		connection.query('DELETE FROM tasks WHERE id = ?', id, callback);
	}
};

module.exports = Tasks;