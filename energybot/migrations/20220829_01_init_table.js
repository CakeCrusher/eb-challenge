const { DataTypes } = require("sequelize");

// Initialized the climates table in the database and adds an id column.
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("climates", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      station_id: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.STRING,
      },
      element: {
        type: DataTypes.STRING,
      },
      data_value: {
        type: DataTypes.INTEGER,
      },
      m_flag: {
        type: DataTypes.STRING,
      },
      q_flag: {
        type: DataTypes.STRING,
      },
      s_flag: {
        type: DataTypes.STRING,
      },
      obs_time: {
        type: DataTypes.STRING,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("climates");
  },
};
