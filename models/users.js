const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return users.init(sequelize, DataTypes);
}

class users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    idUser: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_user'
    },
    userEmail: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: "users_user_email_key",
      field: 'user_email'
    },
    userPassword: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'user_password'
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "users_user_email_key",
        unique: true,
        fields: [
          { name: "user_email" },
        ]
      },
    ]
  });
  }
}
