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
	app.get('/user', function(req, res) {
		//! change to only rendering. Reference API routes for actual data query
		db.Product.findAll({}).then(function(dbProduct) { 
			res.render('user', {
				product: dbProduct
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
	app.get('/products/:prodCategory', function(req, res) {
		//! change to only rendering. Reference API routes for actual data query
		db.Product.findAll({ where: { prodCategory: req.params.prodCategory } }).then(function(dbProduct) {
			res.render('product', {
				product: dbProduct
			});
		});
	});

	// Render 404 page for any unmatched routes
	app.get('*', function(req, res) {
		res.render('404');
	});
};
