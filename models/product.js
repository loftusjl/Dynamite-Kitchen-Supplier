module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define('Product', {
    prodCategory: DataTypes.STRING,
    prodName: DataTypes.STRING,
    prodOnHand: DataTypes.INTEGER,
    prodPAR: DataTypes.INTEGER,
    prodPrice: {
      type: DataTypes.DECIMAL,
      precision: 2
    },
    prPhoto: DataTypes.TEXT
  });
  return Product;
};