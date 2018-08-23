module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define('User', {
		usName: DataTypes.STRING,
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
		usRole: DataTypes.STRING
	});
	return User;
};
