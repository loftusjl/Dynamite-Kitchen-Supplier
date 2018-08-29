const db = require('../models');

module.exports = function(app) {
	// Load index page
	app.get('/', function(req, res) {
		db.Product.findAll({}).then(function(dbProduct) {
			res.render('index', {
				product: dbProduct
			});
		});
	});
	// Load user page
	app.get('/basicuser', function(req, res) {
		//! change to only rendering. Reference API routes for actual data query
		db.Product.findAll({}).then(function(dbProduct) { 
			res.render('basicuser', {
				product: dbProduct
			});
		});
	});
	// Load superUser page
	app.get('/superUser', function(req, res) {
		db.Product.findAll({}).then(function(dbProduct) {
			res.render('superUser', {
				product: dbProduct
			});
		});
	});
	// Load supervisor page
	app.get('/supervisor', function(req, res) {
		db.Product.findAll({})
			.then(dbProduct => res.render('supervisor', {
				product: dbProduct
			}));
	});

	// Load product page and pass in an product by id
	//! change to raw query. add username. sum(qty), format total currency, date ordered
	app.get('/order', function(req, res) {
		db.Order.findAll({}).then(function(dbOrder) {
			res.render('order', {
				order: dbOrder
			});
		});
	});
	app.get('/user', function(req, res) {
		db.User.findAll({}).then(function(dbUser) {
			res.render('user', {
				user: dbUser
			});
		});
	});
	// Render 404 page for any unmatched routes
	app.get('*', function(req, res) {
		res.render('404');
	});
};
