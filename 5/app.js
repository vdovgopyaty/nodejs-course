var express = require('express'),
	exphbs = require('express-handlebars'),
	bodyParser = require('body-parser'),
	users = require('./models/users.js'),
	app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	layoutsDir: __dirname + '/views',
	partialsDir:[
		__dirname + '/views/'
	],
	helpers: {}
}));

app.set('view engine', 'handlebars');

app.get('/', function(req, res){
	res.redirect('/list');
});

app.get('/list', function(req, res){
	users.read(function(err, result) {
		res.render('list', {
			users: result
		})
	})

});

app.post('/add', function(req, res) {
	users.create({
		name: req.body.name,
		role: req.body.role,
		date: new Date().getTime()
	}, function(err) {
		if (err) {
			console.log(err);
			return;
		}

		res.redirect('/list');
	})
});

app.post('/update', function(req, res) {
	users.update(req.body.id, {
		name: req.body.name,
		role: req.body.role
	}, function(err) {
		if (err) {
			console.log(err);
			return;
		}

		res.redirect('/list');
	})
})

app.get('/delete/:id', function(req, res) {
	users.delete(req.params.id, function(err) {
		if (err) {
			console.log(err);
			return;
		}

		res.redirect('/list');
	})
})

app.use(function(req, res, next){
	res.status(404);

	// respond with html page
	if (req.accepts('html')) {
		res.render('404', {
			url: req.url
		});
		return;
	}

	// respond with json
	if (req.accepts('json')) {
		res.send({ error: 'Not found' });
		return;
	}

	// default to plain-text. send()
	res.type('txt').send('Not found');
});

app.listen(3000);
