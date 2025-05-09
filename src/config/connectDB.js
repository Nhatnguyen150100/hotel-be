"use strict";
import logger from "./winston";
require("dotenv").config();

const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DB_DATABASE,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: process.env.DB_DIALECT,
//     logging: (message) => {
//       logger.info(message);
//     },
//     dialectOptions:
//       process.env.DB_SSL === "true"
//         ? {
//             ssl: {
//               require: true,
//               rejectUnauthorized: false,
//             },
//           }
//         : {},
//   }
// );

const sequelize = new Sequelize("db_hotel", "user", "password", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: (message) => {
    logger.info(message);
  },
  dialectOptions: {},
});

const connectDB = {
  connect: async () => {
    try {
      await sequelize.authenticate();
      logger.info("Connection has been established successfully.");
    } catch (error) {
      logger.info("Unable to connect to the database:", error);
    }
  },
};

export default connectDB;
