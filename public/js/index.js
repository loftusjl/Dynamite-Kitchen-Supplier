<<<<<<< HEAD

=======
// starting passport.js for login authentication
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done) {
	User.findOne({ username: username }, function(err, user) {
		if (err) { return done(err); }
		if (!user) {
			return done(null, false, { message: 'Incorrect username.' });
		}
		if (!user.validPassword(password)) {
			return done(null, false, { message: 'Incorrect password.' });
		}
		return done(null, user);
	});
}
));
>>>>>>> e8e5643b8006ad8f8291383ec5b7e5735d8da509
