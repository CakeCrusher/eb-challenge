// sets up express api
const express = require("express");
const app = express();
const cors = require("cors");

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const stationRouter = require("./controllers/stations");

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/stations", stationRouter);

// start server
const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

start();
