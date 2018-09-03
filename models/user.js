var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define('User', {
		usName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		usPhone: DataTypes.STRING,
		usStreet: DataTypes.STRING,
		usCity: DataTypes.STRING,
		usState: DataTypes.STRING,
		usZip: {
			type: DataTypes.INTEGER,
			len: [5]
		},
		usRole: {
			type: DataTypes.INTEGER,
			defaultValue:0,
			allowNull: false,
		},
		usEmail: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
			}
		},
		usPassword: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastLogin: {
			type: DataTypes.DATE
		},
		usStatus: {
			type: DataTypes.ENUM('active', 'inactive'),
			defaultValue: 'active'
		}
	});

	// Creating a custom method for our User model. 
	//This will check if an unhashed password entered by the 
	//user can be compared to the hashed password stored in our database
	User.prototype.validPassword = function(password) {
		return bcrypt.compareSync(password, this.password);
	};
	// Hooks are automatic methods that run during various phases of the User Model lifecycle
	// In this case, before a User is created, we will automatically hash their password
	User.hook('beforeCreate', function(user) {
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
	});

	return User;

};
