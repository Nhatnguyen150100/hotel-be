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
      normalDayPriceStart: {
        type: Sequelize.INTEGER,
      },
      normalDayPriceEnd: {
        type: Sequelize.INTEGER,
      },
      summerPriceStart: {
        type: Sequelize.INTEGER,
      },
      summerPriceEnd: {
        type: Sequelize.INTEGER,
      },
      hotDayPriceStart: {
        type: Sequelize.INTEGER,
      },
      hotDayPriceEnd: {
        type: Sequelize.INTEGER,
      },
      holidayPriceStart: {
        type: Sequelize.INTEGER,
      },
      holidayPriceEnd: {
        type: Sequelize.INTEGER,
      },
      titleHoliday: {
        type: Sequelize.STRING,
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
