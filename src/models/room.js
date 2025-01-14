"use strict";
const { Model } = require("sequelize");
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
        hooks: true,
      });
      Room.hasMany(models.Booking, {
        foreignKey: "roomId",
        as: "bookings",
        sourceKey: "id",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Room.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      bedType: DataTypes.STRING,
      acreage: DataTypes.INTEGER,
      normalDayPriceStart: DataTypes.INTEGER,
      normalDayPriceEnd: DataTypes.INTEGER,
      summerPriceStart: DataTypes.INTEGER,
      summerPriceEnd: DataTypes.INTEGER,
      hotDayPriceStart: DataTypes.INTEGER,
      hotDayPriceEnd: DataTypes.INTEGER,
      titleHoliday: DataTypes.STRING,
      holidayPriceStart: DataTypes.INTEGER,
      holidayPriceEnd: DataTypes.INTEGER,
      img_1: DataTypes.STRING,
      img_2: DataTypes.STRING,
      img_3: DataTypes.STRING,
      img_4: DataTypes.STRING,
      img_5: DataTypes.STRING,
      img_6: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
