module.exports = function(sequelize, DataTypes) {
	const OrderLine = sequelize.define('OrderLine', {
		olQuantity: {
			type: DataTypes.INTEGER,
			defaultValue: 1
		},
		prodID: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});
	OrderLine.associate = function(models) {
		OrderLine.belongsTo(models.User, {
			foreignKey: {
				allowNull: true
			}
		});
	};
	return OrderLine;
};
