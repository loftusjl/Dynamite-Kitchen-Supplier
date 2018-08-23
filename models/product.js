module.exports = function (sequelize, DataTypes) {
	const Product = sequelize.define('Product', {
		prodCategory: {
			type: DataTypes.STRING,
			validate: {
				allowNull: false
			}
		},
		prodName: {
			type:  DataTypes.STRING,
			allowNull: false
		},
		prodOnHand: DataTypes.INTEGER,
		prodPAR: DataTypes.INTEGER,
		prodPrice: DataTypes.DECIMAL(10,2),
		prodPhoto: DataTypes.TEXT
	});
	return Product;
};