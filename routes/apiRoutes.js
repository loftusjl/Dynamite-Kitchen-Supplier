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

module.exports = function (app) {
	// Get all products under PAR
	app.get('/api/products/', (req, res) => {
		db.Product.findAll({})
			.then(dbProduct => res.json(dbProduct));
	});
	// Get all products under PAR
	app.get('/api/products/up', (req, res) => {
		sequelize.query('SELECT * FROM products WHERE prodOnHand < prodPAR')
			.then(dbProduct => res.json(dbProduct));
	});
	// get historical order summary
	app.get('/api/orders/:id', (req, res) => {
		sequelize.query('SELECT orders.id, usName, orders.updatedAt, olTotal FROM orders, users WHERE usSupervisorID = users.id AND orders.id=?', {replacements: [req.params.id]})
			.then(dbOrder => res.json(dbOrder));
	});
	app.get('/api/orders/summary/:id', (req, res) => {
		sequelize.query('SELECT * FROM orderlines, orders WHERE orders.id=OrderId AND orders.id=?', {replacements:[req.params.id]})
			.then(dbOrder => res.json(dbOrder));
	});

	app.get('/api/order/:id', (req, res) => {
		sequelize.query('SELECT * FROM products WHERE prodOnHand < prodPAR')
			.then(dbProduct => res.json(dbProduct));
	});
	// search a product by category
	app.get('/api/products/category/:category', (req, res) => {
		db.Product.findAll({where: {prodCategory: req.params.category}})
			.then(dbProduct => res.json(dbProduct));
	});
	// search a product by name
	app.get('/api/products/search/:name', (req, res) => {
		db.Product.findAll({
			where: {prodName: {$like: `%${req.params.name}%`}}
		})
			.then(dbProduct => {
				// res.json(dbProduct);
				res.render('basicuser', {
					product: dbProduct
				});
			});
	});
	// employee pick list view. shows only the items being requested that have not been added to an order yet. (OrderId IS NULL)
	app.get('/api/employee/picklist', function (req, res) {
		sequelize.query('SELECT prodName,prodPAR, prodOnHand, olQuantity, olUnitofIssue FROM products, orderlines WHERE products.id = prodID AND OrderId IS NULL GROUP BY orderlines.id')
			.then(dbProduct => res.json(dbProduct));
	});
	// supervisor pick list view. shows only the items being requested that have not been added to an order yet. (OrderId IS NULL)
	app.get('/api/supervisor/picklist', function (req, res) {
		sequelize.query('SELECT prodName,prodPAR, prodOnHand, olQuantity, olUnitofIssue, prodPrice, SUM(prodPrice*olQuantity) AS Total FROM products, orderlines WHERE products.id = prodID AND OrderId IS NULL GROUP BY orderlines.id')
			.then(dbProduct => res.json(dbProduct));
	});
	// Create a new product
	app.post('/api/supervisor/products', function (req, res) {
		db.Product.create(req.body)
			.then(dbProduct => res.json(dbProduct));
	});
	// create order. must post UserId in request body.
	app.post('/api/supervisor/order', (req,res) => {
		sequelize.query('INSERT INTO orders(usSupervisorID, olTotal, createdAt, updatedAt) SELECT ? AS usSupervisorID, SUM(orderlines.olQuantity*products.prodPrice) AS olTotal, NOW() AS createdAt, NOW() AS updatedAt FROM products, orderlines WHERE products.id = orderlines.prodID AND OrderId IS NULL;', {replacements: [req.body.UserId]})
			.then(dbOrder => {
				sequelize.query('UPDATE orderlines SET orderlines.OrderId=? WHERE OrderId IS NULL;', {
					replacements: [dbOrder[0]] // set OrderId to the new orderID generated
				});
				res.json(dbOrder);
			});
	});
	// create order line
	app.post('/api/order/lineitem', (req,res) => {
		db.OrderLine.create(req.body)
			.then(dbOrder => res.json(dbOrder));
	});
	// update order line
	app.put('/api/order/lineitem/:id', (req,res) => {
		sequelize.query('UPDATE orderlines SET olQuantity=?, UserId=? WHERE id=?', {replacements: [req.body.olQuantity, req.body.UserId, req.params.id]})
			.then(dbOrderLine => res.json(dbOrderLine));
	});
	// Delete an product by id
	app.delete('/api/supervisor/products/:id', function (req, res) {
		db.Product.destroy({
			where: {
				id: req.params.id
			}
		})
			.then(dbProduct => res.json(dbProduct));
	});
	// Update product by id
	app.put('/api/products/:id', function (req, res) {
		sequelize.query('UPDATE products SET prodCategory=?,prodName=?,prodOnHand=?,prodPAR=?,prodPrice=?,prodPhoto=? WHERE id=?', {
			replacements: [req.body.prodCategory, req.body.prodName, req.body.prodOnHand, req.body.prodPAR, req.body.prodPrice, req.body.prodPhoto, req.params.id]
		})
			.then(dbProduct => res.json(dbProduct));
	});
};