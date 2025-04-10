"use strict";
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

const PASSWORD_ADMIN = "password";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash(PASSWORD_ADMIN, 10);
    const id = v4();
    const userData = {
      id,
      email: "admin@gmail.com",
      role: "ADMIN",
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [existingUser] = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE email = :email`,
      {
        replacements: { email: userData.email },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (existingUser) {
      await queryInterface.bulkUpdate(
        "Users",
        {
          password: userData.password,
          updatedAt: userData.updatedAt,
        },
        {
          email: userData.email,
        }
      );
    } else {
      await queryInterface.bulkInsert("Users", [userData]);
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
