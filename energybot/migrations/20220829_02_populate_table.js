const Climate = require("../models/climate");
const { sequelize } = require("../util/db");

// Populates the climates table with the 2017 climate data
module.exports = {
  up: async ({ context: queryInterface }) => {
    const cwd = process.cwd();
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
    FROM '${cwd}/2017.csv'
    DELIMITER ','
    CSV HEADER;`);
  },
  down: async ({ context: queryInterface }) => {
    await Climate.destroy({ where: {} });
  },
};
