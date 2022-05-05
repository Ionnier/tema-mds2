const DataTypes = require("sequelize").DataTypes;
const _barcode = require("./barcode");
const _products = require("./products");
const _users = require("./users");

function initModels(sequelize) {
  const barcode = _barcode(sequelize, DataTypes);
  const products = _products(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  barcode.belongsTo(products, { as: "idProductProduct", foreignKey: "idProduct"});
  products.hasMany(barcode, { as: "barcodes", foreignKey: "idProduct"});

  return {
    barcode,
    products,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
