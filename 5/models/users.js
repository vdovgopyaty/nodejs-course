var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	database: 'mohit',
	user: 'root',
	password: ''
});

connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id ' + connection.threadId);
});

var Users = {
	read: function(callback) {
		connection.query('SELECT * FROM users', callback);
	},

	create: function(user, callback) {
		connection.query('INSERT INTO users SET ?', user, callback);
	},

	update: function(id, user, callback) {
		var sql = 'UPDATE users SET name = ?, role = ? WHERE id = ?';
		connection.query(sql, [
			user.name,
			user.role,
			parseInt(id)
		], callback);
	},

	delete: function(id, callback) {
		connection.query('DELETE FROM users WHERE id = ?', id, callback);
	}
};

module.exports = Users;