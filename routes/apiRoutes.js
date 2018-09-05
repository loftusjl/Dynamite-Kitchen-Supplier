const Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};
var passport = require('passport');

if (config.use_env_variable) {
	var sequelize = new Sequelize(process.env[config.use_env_variable], {
		define: {
			charset: 'utf8',
			collate: 'utf8_general_ci'
		}
	});
} else {
	var sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, config, {
		define: {
			charset: 'utf8',
			collate: 'utf8_general_ci'
		}
	});
}
var db = require('../models');

module.exports = function (app) {

	// Route for logging user out
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
	// Route for getting some data about our user to be used client side
	app.get('/api/user_data', function (req, res) {
		if (!req.user) {
			// The user is not logged in, send back an empty object
			res.json({});
		} else {
			// Otherwise send back the user's usernameand id
			// Sending back a password, even a hashed password, isn't a good idea
			res.json({
				username: req.user.username,
				id: req.user.id
			});
		}
	});

	// Get all users
	app.get('/api/users', (req, res) => {
		db.User.findAll({})
			.then(dbUser => res.json(dbUser));
	});

	// Get all products
	app.get('/api/products/', (req, res) => {
		db.Product.findAll({})
			.then(dbProduct => {
				res.render('basicuser', {
					product: dbProduct
				});
			});
	});
	// get product by id
	app.get('api/products/:id', (req, res) => {
		db.Product.findOne({
			where: {
				id: req.params.id
			}
		})
			.then(dbProduct => res.json(dbProduct));
	});
	// Get all products under PAR
	app.get('/api/products/up', (req, res) => {
		sequelize.query('SELECT * FROM Products LEFT JOIN (SELECT olQuantity, prodID FROM OrderLines WHERE OrderId IS NULL) AS pendingOrder ON Products.id=pendingOrder.prodID WHERE prodOnHand < prodPAR;')
			.then(dbProduct => res.json(dbProduct));
	});
	// get historical order summary
	app.get('/api/orders', (req, res) => {
		sequelize.query('SELECT Orders.id, usName, Orders.updatedAt, olTotal FROM Orders, Users WHERE usSupervisorID = Users.id')
			.then(dbOrder => {
				// res.json(dbProduct);
				res.render('order', {
					order: dbOrder
				});
			});
	});
	// get order breakdown
	app.get('/api/orders/summary/:id', (req, res) => {
		sequelize.query('SELECT prodName, olQuantity, prodPrice, SUM(prodPrice*olQuantity) AS Total, usName FROM Products, OrderLines, Users WHERE Products.id=prodID AND OrderId=? GROUP BY OrderLines.id', {
			replacements: [req.params.id]
		})
			.then(dbOrder => res.json(dbOrder));
	});
	// search a product by category
	app.get('/api/products/category/:category', (req, res) => {
		db.Product.findAll({
			where: {
				prodCategory: req.params.category
			}
		})
			.then(dbProduct => {
				// res.json(dbProduct);
				res.render('basicuser', {
					product: dbProduct,
					
				});
			});
	});
	// search a product by name
	app.get('/api/products/search/:name', (req, res) => {
		db.Product.findAll({
			where: {
				prodName: {
					$like: `%${req.params.name}%`
				}
			}
		})
			.then(dbProduct => {
				// res.json(dbProduct);
				res.render('basicuser', {
					product: dbProduct
				});
			});
	});
	// employee pick list view. shows only the items being requested that have not been added to an order yet. (OrderId IS NULL)
	app.get('/api/order/lineitem/:id', function (req, res) {
		db.OrderLine.findOne({
			where: {
				id: req.params.id
			}
		})
			.then(dbOrderLine => res.json(dbOrderLine));
	});
	// employee pick list view. shows only the items being requested that have not been added to an order yet. (OrderId IS NULL)
	app.get('/api/employee/picklist', function (req, res) {
		sequelize.query('SELECT prodName,prodPAR, prodOnHand, olQuantity, prodUnitofIssue FROM Products, OrderLines WHERE Products.id = prodID AND OrderId IS NULL GROUP BY OrderLines.id')
			.then(dbProduct => res.json(dbProduct));
	});
	// employee pick list view. shows only the items being requested that have not been added to an order yet. (OrderId IS NULL)
	app.get('/api/employee/picklist', function (req, res) {
		sequelize.query('SELECT prodName,prodPAR, prodOnHand, olQuantity, prodUnitofIssue FROM Products, OrderLines WHERE Products.id = prodID AND OrderId IS NULL GROUP BY OrderLines.id')
			.then(dbProduct => res.json(dbProduct));
	});
	// supervisor pick list view. shows only the items being requested that have not been added to an order yet. (OrderId IS NULL)
	app.get('/api/supervisor/picklist', function (req, res) {
		sequelize.query('SELECT prodName,prodPAR, prodOnHand, olQuantity, prodUnitofIssue, prodPrice, SUM(prodPrice*olQuantity) AS Total FROM Products, OrderLines WHERE Products.id = prodID AND OrderId IS NULL GROUP BY OrderLines.id')
			.then(dbProduct => res.json(dbProduct));
	});
	// Create a new product
	app.post('/api/supervisor/products', function (req, res) {
		db.Product.create(req.body)
			.then(dbProduct => res.json(dbProduct));
	});
	// create order. must post UserId in request body.
	app.post('/api/supervisor/order', (req, res) => {
		sequelize.query('INSERT INTO Orders(usSupervisorID, olTotal, createdAt, updatedAt) SELECT ? AS usSupervisorID, SUM(OrderLines.olQuantity*Products.prodPrice) AS olTotal, NOW() AS createdAt, NOW() AS updatedAt FROM Products, OrderLines WHERE Products.id = OrderLines.prodID AND OrderId IS NULL;', {
			replacements: [req.body.UserId]
		})
			.then(dbOrder => {
				sequelize.query('UPDATE OrderLines SET OrderLines.OrderId=? WHERE OrderId IS NULL;', {
					replacements: [dbOrder[0]] // set OrderId to the new orderID generated
				});
				res.json(dbOrder);

			});
	});
	// create order line
	app.post('/api/order/lineitem', (req, res) => {
		db.OrderLine.create(req.body)
			.then(dbOrder => res.json(dbOrder));
	});
	// Using the passport.authenticate middleware with our local strategy.
	// If the user has valid login credentials, send them to the members page.
	// Otherwise the user will be sent an error
	app.post('/api/login', passport.authenticate('local-login', {
		successRedirect: '/basicuser',
		failureRedirect: '/login',
		failureFlash: true
	}));
	// process the signup form
	app.post('/api/users', passport.authenticate('local-signup', {
		successRedirect: '/basicuser', // redirect to the secure profile section
		failureRedirect: '/', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));
	// update order line
	app.put('/api/order/lineitem/:id', (req, res) => {
		sequelize.query('UPDATE OrderLines SET olQuantity=? WHERE id=?', {
			replacements: [req.body.olQuantity, req.params.id]
		})
			.then(dbOrderLine => res.json(dbOrderLine));
	});
	// Update product by id
	app.put('/api/products/:id', function (req, res) {
		sequelize.query('UPDATE Products SET prodCategory=?,prodName=?,prodOnHand=?,prodPAR=?,prodPrice=?,prodPhoto=? WHERE id=?', {
			replacements: [req.body.prodCategory, req.body.prodName, req.body.prodOnHand, req.body.prodPAR, req.body.prodPrice, req.body.prodPhoto, req.params.id]
		})
			.then(dbProduct => res.json(dbProduct));
	});
	app.put('/api/users/edit/:id', function (req, res) {
		sequelize.query('UPDATE Users SET usName=?, usPhone=?, usStreet=?, usCity=?, usState=?, usZip=?, usRole=?, usEmail=?, usPassword=?, usStatus=? WHERE id=?',{
			replacements: [req.body.usName, req.body.usPhone, req.body.usStreet, req.body.usCity, req.body.usState, req.body.usZip, req.body.usRole, req.body.usEmail, req.body.usPassword, req.body.usStatus, req.params.id]
		})
			.then(dbUser => res.json(dbUser));
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
	// Delete an product by id
	app.delete('/api/supervisor/orderline/:id', function (req, res) {
		db.OrderLine.destroy({
			where: {
				id: req.params.id
			}
		})
			.then(dbOrderLine => res.json(dbOrderLine));
	});

};