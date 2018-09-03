// var bcrypt = require('bcrypt-nodejs');
var db = require('../../models');
var LocalStrategy = require('passport-local').Strategy;
// var flash = require('connect-flash');

// expose this function to our app using module.exports
module.exports = function (passport) {

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, username, password, next) {
		// find a user whose username is the same as the forms username
		// we are checking to see if the user trying to login already exists
		db.User.findOne({where: {usName: username}})
			.then(function(dbUser, err) {
				console.log('DB Response: ', username);
				console.log('DB Response2: ', req.body);
				if (err){return next(err);}
				console.log('err: ', err);			
				if (dbUser) {return next(null, false);
				} else {
				// if there is no user with that username
				// create the user
					db.User.create({
						usName: req.body.username,
						usPhone: req.body.phoneNumber,
						usStreet: req.body.address,
						usCity: req.body.city,
						usState: req.body.state,
						usZip: req.body.zip,
						usRole: req.body.role,
						usEmail: req.body.email,
						usPassword: req.body.password
					}).then(function (newUser) {

						return next(null, newUser);
					});
				}
			});
	})
	);

	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-login', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, username, password, next) { // callback with username and password from our form
		db.User.findOne({where: {usName: username, usPassword: password}})
			.then(function(dbUser, err) {
				// console.log('DB RESPONSE', dbUser);
				if (err) { return next(err); }
				console.log('err: ', err);
				if (!dbUser) { return next(null, false, { message: req.flash('loginMessage', 'No user found.')});}
				console.log('username: ', username);
				console.log('password:', password);					
				return next(null, dbUser);
			});
	})
	);

	// In order to help keep authentication state across HTTP requests,
	// Sequelize needs to serialize and deserialize the user
	// Just consider this part boilerplate needed to make it all work
	passport.serializeUser(function(user, cb) {
		cb(null, user);
	});
	//
	passport.deserializeUser(function(obj, cb) {
		cb(null, obj);
	});
};