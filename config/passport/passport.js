var bCrypt = require('bcrypt-nodejs');
var db = require('../../models');

// expose this function to our app using module.exports
module.exports = function (passport, user) {
	var User = user;
	var LocalStrategy = require('passport-local').Strategy;

	//serialize
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	
	// used to deserialize the user
	passport.deserializeUser(function (id, done) {
		db.query('select * from user where id = ' + id, function (err, rows) {
			done(err, rows[0]);
		});
	});
	passport.use(new LocalStrategy(
		function (username, password, done) {
			db.query('select * from user where username= ' + username, function (err, rows) {
				done(err, rows[0]);
				console.log(rows);
			});
		}
	));
};