var db = require('../models');

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
			
			});
		});
	});
	// Load supervisor page
	app.get('/supervisor', function(req, res) {
		//! change to only rendering. Reference API routes for actual data query
		db.Product.findAll({}).then(function(dbProduct) {
			res.render('supervisor', {
				product: dbProduct
			});
		});
	});

	// Load product page and pass in an product by id
	app.get('/order', function(req, res) {
		db.Order.findAll({ where: { id: req.params.id } }).then(function(dbProduct) {
			res.render('order', {
			
			});
		});
	});
	app.get('/user', function(req, res) {
		db.User.findAll({ where: { id: req.params.id } }).then(function(dbProduct) {
			res.render('user', {
				
			});
		});
	});
	// Render 404 page for any unmatched routes
	app.get('*', function(req, res) {
		res.render('404');
	});
};
