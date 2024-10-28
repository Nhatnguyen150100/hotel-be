'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FacilitiesRooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomId: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "Rooms",
            name: "roomId",
          },
          key: "id",
        },
      },
      facilityId: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "Facilities",
            name: "facilityId",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FacilitiesRooms');
  }
};