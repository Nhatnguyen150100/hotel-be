'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasMany(models.FacilitiesRoom, {
        foreignKey: "roomId",
        as: "facilitiesRooms",
        sourceKey: "id",
        onDelete: "CASCADE",
        hooks: true
      });
      Room.hasMany(models.Booking, {
        foreignKey: "roomId",
        as: "bookings",
        sourceKey: "id",
        onDelete: "CASCADE",
        hooks: true
      });
    }
  }
  Room.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    listImages: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};