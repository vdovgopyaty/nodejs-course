'use strict';

var mysql = require('mysql');
var config = require('../config');

var pool = mysql.createPool({
	host: config.get('mysql:host'),
	database: config.get('mysql:database'),
	user: config.get('mysql:user'),
	password: config.get('mysql:password')
});

pool.getConnection(function(err, connection) {
	if (err) {
		console.error('Error connecting: ' + err.stack);
		return;
	}
	console.log('Database connected as id ' + connection.threadId);
});

module.exports = pool;
