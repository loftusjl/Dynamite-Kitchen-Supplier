var db = require('../models');

module.exports = function(app) {
	// Get all products
	app.get('/api/products', function(req, res) {
		db.Product.findAll({}).then(function(dbProduct) {
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
