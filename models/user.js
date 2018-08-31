module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define('User', {
		usName: {
			type: DataTypes.STRING,
			// allowNull: false,
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
		username: DataTypes.TEXT,
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

	return User;

};
