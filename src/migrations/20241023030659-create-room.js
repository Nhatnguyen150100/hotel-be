"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rooms", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      bedType: {
        type: Sequelize.STRING,
      },
      acreage: {
        type: Sequelize.INTEGER,
      },
      normalDayPrice: {
        type: Sequelize.INTEGER,
      },
      weekendPrice: {
        type: Sequelize.INTEGER,
      },
      holidayPrice: {
        type: Sequelize.INTEGER,
      },
      img_1: {
        type: Sequelize.STRING,
      },
      img_2: {
        type: Sequelize.STRING,
      },
      img_3: {
        type: Sequelize.STRING,
      },
      img_4: {
        type: Sequelize.STRING,
      },
      img_5: {
        type: Sequelize.STRING,
      },
      img_6: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Rooms");
  },
};
