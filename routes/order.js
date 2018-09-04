const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	const Order = sequelize.define('Order', {
		usSupervisorID: DataTypes.INTEGER,
		olTotal: DataTypes.DECIMAL(10,2),
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW},
		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW}
    	});
	Order.associate = function (models) {
		Order.hasMany(models.OrderLine);
	};
	return Order;
};