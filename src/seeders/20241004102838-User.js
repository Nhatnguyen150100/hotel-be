"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userData = {
      id: "d511aeab-f46d-248c-a29d-55ad1855651a",
      email: "admin@gmail.com",
      role: "ADMIN",
      password:
        "$2b$10$DChhTLTf0XAHg67cI45CDeFBDLOze1zkicc3Bf2kBk7SUpfBnK8iC", // plain = Admin@123
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await queryInterface.bulkInsert('Users', [userData], {
      updateOnDuplicate: ["email", "role", "password", "updatedAt"]
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};