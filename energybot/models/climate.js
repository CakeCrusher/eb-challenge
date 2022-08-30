const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class Climate extends Model {}

Climate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    stationId: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    element: {
      type: DataTypes.STRING,
    },
    dataValue: {
      type: DataTypes.INTEGER,
    },
    mFlag: {
      type: DataTypes.STRING,
    },
    qFlag: {
      type: DataTypes.STRING,
    },
    sFlag: {
      type: DataTypes.STRING,
    },
    obsTime: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "climate",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Climate;
