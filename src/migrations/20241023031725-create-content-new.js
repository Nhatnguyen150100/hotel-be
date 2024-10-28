'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContentNews', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      newId: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "News",
            name: "newId",
          },
          key: "id",
        },
      },
      order: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('ContentNews');
  }
};