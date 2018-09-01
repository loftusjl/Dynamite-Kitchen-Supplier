var bCrypt = require('bcrypt-nodejs');
var db = require('../../models');
var LocalStrategy = require('passport-local').Strategy;

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
		function(req, username, password, done) {
			// find a user whose username is the same as the forms username
			// we are checking to see if the user trying to login already exists
			db.User.findAll({where: {username: req.params.username}}, function(err, rows) {
				if (err)
				{return done(err);}
				if (rows.length) {
					return done(null, false, alert('signupMessage', 'That username is already taken.'));
				} else {
					// if there is no user with that username
					// create the user
					var newUserMysql = {
						username: username,
						password: bCrypt.hashSync(password, null, null) // use the generateHash function in our user model
					};

					// var insertQuery = 'INSERT INTO users ( username, password ) values (?,?)';

					db.User.create({ username: newUserMysql.username, password: newUserMysql.password}, { fields: [ 'username', 'password' ] }).then(dbUser => {
						console.log(dbUser.get({
							plain: true
						}));
						
						newUserMysql.id = rows.insertId;

						return done(null, newUserMysql);
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
		function(username, password, next) { // callback with username and password from our form
			db.User.findOne({where: [{usName: username}, {usPassword: password}]})
				.then()
				.then(function(dbUser, err) {
					console.log('DB RESPONSE', dbUser[0]);
					if (err) { return next(err); }
					console.log('err: ', err);
					if (!username) { return next(null, false);}
					console.log('username: ', username);
					if (!password) { return next(null, false); }
					console.log('password: ', password);
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