module.exports = function (sequelize, DataTypes) {
    var Products = sequelize.define('products', {
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
    return Products;
};