const Sequelize = require("sequelize");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env")});

// create connection to our db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "127.0.0.1",
        dialect: "mysql",
        port: 3306,
        // logging: console.log,
      }
    );

module.exports = sequelize;
