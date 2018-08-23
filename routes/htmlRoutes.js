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

	// Load product page and pass in an product by id
	app.get('/products/:id', function(req, res) {
		db.Product.findOne({ where: { prodName: req.params.prodName } }).then(function(dbProduct) {
			res.render('products', {
				product: dbProduct
			});
		});
	});

	// Render 404 page for any unmatched routes
	app.get('*', function(req, res) {
		res.render('404');
	});
};
