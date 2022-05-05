const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return products.init(sequelize, DataTypes);
}

class products extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    idProduct: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_product'
    },
    productName: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "products_product_name_key",
      field: 'product_name'
    }
  }, {
    sequelize,
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_pkey",
        unique: true,
        fields: [
          { name: "id_product" },
        ]
      },
      {
        name: "products_product_name_key",
        unique: true,
        fields: [
          { name: "product_name" },
        ]
      },
    ]
  });
  }
}
