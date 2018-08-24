const Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};

if (config.use_env_variable) {
	var sequelize = new Sequelize(process.env[config.use_env_variable], {
		define: {
			charset: 'utf8',
			collate: 'utf8_general_ci'
		}
	});
} else {
	var sequelize = new Sequelize(
		process.env.DB_DATABASE,
		process.env.DB_USER,
		process.env.DB_PASS,
		config, {
			define: {
				charset: 'utf8',
				collate: 'utf8_general_ci'
			}
		}
	);
}
var db = require('../models');

module.exports = function(app) {
	// Get all products
	app.get('/api/products', function(req, res) {
		db.Product.findAll({}).then(function(dbProduct) {
			res.json(dbProduct);
		});
	});
	// Get all products under PAR
	app.get('/api/products/up', function(req, res) {
		sequelize.query('SELECT * FROM products WHERE prodOnHand < prodPAR').then(function(dbProduct) {
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
