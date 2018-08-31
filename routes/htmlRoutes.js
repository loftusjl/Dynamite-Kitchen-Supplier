const db = require('../models');

module.exports = function(app) {	
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup');
	});
	// show the login form
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('index');
	});	
	// PROFILE SECTION =========================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user // get the user out of session and pass to template
		});
	});
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
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

	// Load product page and pass in an product by id
	//! change to raw query. add username. sum(qty), format total currency, date ordered
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

function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
	{return next();}
	// if they aren't redirect them to the home page
	res.redirect('/');
}
