'use strict';

var db = require('../libs/connection');

// ?intervalSize=week
// ?interval=2015-48

var Tasks = {
	create: function(task, callback) {
		db.query('INSERT INTO tasks SET ?', task, callback);
	},
	read: function(callback) {
		db.query('SELECT tasks.id, tasks.title, tasks.description, tasks.completed, actions.action, actions.done, actions.date ' +
		         'FROM tasks ' +
		         'LEFT JOIN actions ' +
		         'ON actions.taskid = tasks.id', callback);
	},
	update: function(id, task, callback) {
		var sql = 'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?';
		db.query(sql, [
			task.title,
			task.description,
			task.completed,
			parseInt(id)
		], callback);
	},
	delete: function(id, callback) {
		connection.query('DELETE FROM tasks WHERE id = ?', id, callback);
	}
};

module.exports = Tasks;