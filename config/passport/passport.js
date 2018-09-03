var bCrypt = require('bcrypt-nodejs');
var db = require('../../models');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

// expose this function to our app using module.exports
module.exports = function (passport) {

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use(
		'local-signup',
		new LocalStrategy({
			// by default, local strategy uses username and password, we will override with email
			usernameField : 'username',
			passwordField : 'password',
			passReqToCallback : true // allows us to pass back the entire request to the callback
		},
		function(req, username, password, next) {
			// find a user whose username is the same as the forms username
			// we are checking to see if the user trying to login already exists
			db.User.findAll({where: {usName: username}}, function(err, dbUser) {
				if (err){return next(err);}
				console.log(err);				
				if (dbUser) {return next(null, false, alert('signupMessage', 'That username is already taken.'));
				} else {
					// if there is no user with that username
					// create the user
					var newUser = {
						username: username,
						password: bCrypt.hashSync(password, null, null) // use the generateHash function in our user model
					};

					

					db.User.create({ username: newUser.username, password: newUser.password}, { fields: [ 'username', 'password' ] }).then(dbUser => {
						console.log(dbUser.get({
							plain: true
						}));
						
						newUser.id = dbUser.insertId;

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

	passport.use(
		'local-login',
		new LocalStrategy({
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