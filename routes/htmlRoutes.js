const Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};

if (config.use_env_variable) {
	var sequelize = new Sequelize(process.env[config.use_env_variable], {
		define: {charset: 'utf8',collate: 'utf8_general_ci'}
	});
} else {
	var sequelize = new Sequelize(process.env.DB_DATABASE,process.env.DB_USER,process.env.DB_PASS,config, {define: {charset: 'utf8',collate: 'utf8_general_ci'}});
}
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
		db.Product.findAll({}).then(function(dbProduct) {
			res.render('basicuser', {
				product: dbProduct
			});
		});
		
	});

	// load page for products under par
	app.get('/underpar', function(req, res) {
		sequelize.query('SELECT * FROM products WHERE prodOnHand < prodPAR')
			.then(underPAR => {
				res.render('underpar', {par:underPAR[0]});
			});

	});

	// Load product page and pass in an product by id
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
