module.exports = function(sequelize, DataTypes) {
	const Role = sequelize.define('Role', {
		rlTitle: DataTypes.STRING,
	});
	return Role;
};