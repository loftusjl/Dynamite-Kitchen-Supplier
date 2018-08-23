module.exports = function(sequelize, DataTypes) {
	const OrderLine = sequelize.define('OrderLine', {
		olQuantity: DataTypes.INTEGER,
		prodID: DataTypes.INTEGER
	});
	OrderLine.associate = function(models) {
		OrderLine.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};
	return OrderLine;
};
