module.exports = function (sequelize, DataTypes) {
	const Order = sequelize.define('Order', {
		olID: DataTypes.INTEGER,
		usSupervisorID: DataTypes.INTEGER,
    	});
	Order.associate = function (models) {
		Order.hasMany(models.OrderLine);
	};
	return Order;
};