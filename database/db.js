const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);
const initModels = require("../models/init-models")(sequelize);

exports.sequelize = sequelize

exports.models = initModels
