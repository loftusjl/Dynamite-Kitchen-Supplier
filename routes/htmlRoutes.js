var cookie = require('cookie');
const Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};
let roleCookie;
let roleVal;
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require('../config/middleware/isAuthenticated');

if (process.env.JAWSDB_URL) {
	var sequelize = new Sequelize(process.env[JAWSEB_URL], {
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
	app.get('/', function (req, res) {
		// If the user already has an account send them to the members page
		if (req.user) {
			res.render('basicuser');
		}
		res.render('index');
	});
	app.get('/signup', function (req, res) {
		// If the user already has an account send them to the members page
		if (req.user) {
			res.render('basicuser');
		}
		res.render('signup');
	});
	//
	app.get('/login', function (req, res) {
		// If the user already has an account send them to the members page
		if (req.user) {
			res.render('basicuser');
		}
		res.render('login');
	});
	app.get('/basicuser', isLoggedIn, function (req, res) {
		roleCookie = cookie.serialize('role', req.user.usRole, 'UserId', req.user.usName, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});
		roleVal = cookie.parse(roleCookie);
		res.render('basicuser', {
			user: req.user, // get the user out of session and pass to template
			role: parseInt(roleVal.role)
		});
	});
	//
	// Here we've add our isAuthenticated middleware to this route.
	// If a user who is not logged in tries to access this route they will be 
	//redirected to the signup page
	app.get('/basicuser', isAuthenticated, function (req, res) {
		db.User.findAll({}).then(function (dbUser) {
			
			res.render('basicuser', {
				user: dbUser,
				role: parseInt(roleVal.role)
			});

		});
	});
	// Load user page
	app.get('/basicuser', function (req, res) {
		db.Product.findAll({}).then(function (dbProduct) {
			res.render('basicuser', {
				product: dbProduct,
				role: parseInt(roleVal.role)
			});
		});

	});

	// load page for products under par
	app.get('/underpar', function (req, res) {
		sequelize.query('SELECT * FROM Products LEFT JOIN (SELECT olQuantity, prodID, id AS olID FROM OrderLines WHERE OrderId IS NULL) AS pendingOrder ON Products.id=pendingOrder.prodID WHERE prodOnHand < prodPAR;')
			.then(underPAR => {
				res.render('underpar', {
					par: underPAR[0],
					role: parseInt(roleVal.role)
				});
			});

	});

	// Load product page and pass in an product by id
	app.get('/order', function (req, res) {
		sequelize.query('SELECT OrderLines.id AS id, prodID, prodCategory, prodName, prodPAR, prodOnHand, olQuantity, prodUnitofIssue, prodPrice, SUM(prodPrice*olQuantity) AS Total, usName FROM Products, OrderLines LEFT JOIN Users on UserId=Users.id WHERE Products.id = prodID AND OrderId IS null GROUP BY OrderLines.id ORDER BY prodCategory ASC, prodName ASC')
			.then(dbOrderline => {
				sequelize.query('SELECT Orders.id, Orders.updatedAt, olTotal, usSupervisorID FROM Orders')
					.then(dbOrder => {
						res.render('order', {
							orderline: dbOrderline[0],
							order: dbOrder[0],
							role: parseInt(roleVal.role)
						});
					});
			});
	});
	app.get('/user', function (req, res) {
		db.User.findAll({}).then(function (dbUser) {
			res.render('user', {
				user: dbUser,
				role: parseInt(roleVal.role)
			});
		});
	});
	// Render 404 page for any unmatched routes
	app.get('*', function (req, res) {
		res.render('404');
	});
};

function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) {
		return next();
	}
	// if they aren't redirect them to the home page
	res.redirect('/');
}