var bCrypt = require('bcrypt-nodejs');
var db = require('../../models');
var LocalStrategy = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function (passport) {
	
	//serialize
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	
	// used to deserialize the user
	passport.deserializeUser(function(done) {
		db.User.findById({where: {id: req.params.id}}, function(err, rows){
			done(err, rows[0]);
		});
	});

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
		function(req, username, password, done) { // callback with username and password from our form
			db.User.findAll({where: {username: username}})
				.then(dbResponse => {
					console.log('DB RESPONSE', dbResponse);
				// if (err)
				// 	return done(err);
				// if (!rows.length) {
				// 	return done(null, false, alert('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
				// }

				// // if the user is found but the password is wrong
				// if (!bCrypt.compareSync(password, rows[0].password))
				// 	return done(null, false, alert('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

				// // all is well, return successful user
				// return done(null, rows[0]);
				});
		})
	);
};