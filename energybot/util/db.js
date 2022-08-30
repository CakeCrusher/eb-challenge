const Sequelize = require("sequelize");
const { DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, DB_HOST } = require("./config");
const { Umzug, SequelizeStorage } = require("umzug");

// configuration to establish sequelize connnection
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
});

// connect to the database
const connectToDatabase = async () => {
  try {
    console.log("DB_NAME: ", DB_NAME);
    await sequelize.authenticate();
    await runMigrations();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return process.exit(1);
  }
  return null;
};

// migrations configuration for umzug
const migrationConfig = {
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

// to foreward the migrations
const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig);
  const migrations = await migrator.up();
  console.log("Migrations: ", { files: migrations.map((mig) => mig.name) });
};

// to rollback the migrations
const rollbackMigrations = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConfig);
  await migrator.down();
};

module.exports = {
  sequelize,
  connectToDatabase,
  rollbackMigrations,
};
