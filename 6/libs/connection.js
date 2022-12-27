'use strict';

var mysql = require('mysql');
var config = require('../config');

var connection = mysql.createConnection({
	host: config.get('mysql:host'),
	database: config.get('mysql:database'),
	user: config.get('mysql:user'),
	password: config.get('mysql:password')
});

connection.connect(function(err) {
	if (err) {
		console.error('Error connecting: ' + err.stack);
		return;
	}
	console.log('Database connected as id ' + connection.threadId);
});

module.exports = connection;
