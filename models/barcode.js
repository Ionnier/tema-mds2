const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return barcode.init(sequelize, DataTypes);
}

class barcode extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    idProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id_product'
      },
      field: 'id_product'
    },
    barcodeNumber: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'barcode_number'
    }
  }, {
    sequelize,
    tableName: 'barcode',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_bar_code",
        unique: true,
        fields: [
          { name: "id_product" },
          { name: "barcode_number" },
        ]
      },
    ]
  });
  }
}
