const uploadToTable = require("../util/tableUpload");
const Climate = require("../models/climate");
const { sequelize } = require("../util/db");

module.exports = {
  up: async ({ context: queryInterface }) => {
    // await uploadToTable(queryInterface, Climate);
    await sequelize.query(`COPY climates(
      station_id,
      date,
      element,
      data_value,
      m_flag,
      q_flag,
      s_flag,
      obs_time
    )
    FROM 'C:/Projects/energybot/2017.csv'
    DELIMITER ','
    CSV HEADER;`);
  },
  down: async ({ context: queryInterface }) => {
    await Climate.destroy({ where: {} });
  },
};
