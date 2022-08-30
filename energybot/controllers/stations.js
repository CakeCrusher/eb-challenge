const router = require("express").Router();
const { sequelize } = require("../util/db");
const Climate = require("../models/climate");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  // return the first 10 rows of the climate table and skip the first row
  try {
    const climates = await Climate.findAll({
      limit: 10,
      offset: 0,
    });
    res.json(climates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let where = {
      stationId: req.params.id,
    };

    if (req.query.dv) {
      where.dataValue = {
        [Op.gt]: req.query.dv,
      };
    }

    const climate = await Climate.findAll({
      limit: 10,
      offset: req.query.offset || 0,
      where,
    });
    res.json(climate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}),
  (module.exports = router);
