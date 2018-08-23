module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define('User', {
		usName: DataTypes.STRING,
		allowNull: false,
		usPhone: {
			type: DataTypes.SMALLINT,
			validate: {
				len: [10,15]
			}
		},
		usStreet: DataTypes.STRING,
		usCity: DataTypes.STRING,
		usState: DataTypes.STRING,
		usZip: {
			type: DataTypes.INTEGER,
			len: [5]
		},
		usRole: DataTypes.INTEGER,
		defaultValue:0,
		allowNull: false,
	});
	return User;
};
