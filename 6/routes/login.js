// var express = require('express');
// var tasks = require('../models/tasks');
// var router = express.Router();

// var mustBeAuthenticated = function(req, res, next) {
// 	if (req.isAuthenticated()) {
// 		next();
// 	} else {
// 		res.redirect('/');
// 	}
// };

// router.get('/login', passport.authenticate('local'), function(req, res) {
// 	res.render('login', {
// 		user : req.isAuthenticated() ? req.user.login : 'Вы не вошли'
// 	});
// });

// router.post('/login', db.user);

// router.post('/logout', function(req, res) {

// 	req.logout();

// 	res.redirect('/')

// });



// module.exports = router;