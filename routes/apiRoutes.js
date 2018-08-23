var db = require('../models');

module.exports = function(app) {
	// Get all products
	app.get('/api/products', function(req, res) {
		db.Product.findAll({}).then(function(dbProduct) {
			res.json(dbProduct);
		});
	});
	// search a product by category
	app.get('/api/products/category/:category', function(req, res) {
		db.Product.findAll({ where: { prodCategory: req.params.category } }).then(function(dbProduct) {
			res.json(dbProduct);
		});
	});
	// search a product by name
	app.get('/api/products/search/:name', function(req, res) {
		db.Product.findAll({ 
			where: { 
				prodName: { $like: `%${req.params.name}%`}
			}
		}).then(function(dbProduct) {
			res.json(dbProduct);
		});
	});

	// Create a new product
	app.post('/api/products', function(req, res) {
		db.Product.create(req.body).then(function(dbProduct) {
			res.json(dbProduct);
		});
	});

	// Delete an product by id
	app.delete('/api/products/:id', function(req, res) {
		db.Product.destroy({ where: { id: req.params.id } }).then(function(dbProduct) {
			res.json(dbProduct);
		});
	});
};
