"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FacilitiesRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FacilitiesRoom.belongsTo(models.Room, {
        foreignKey: { name: "roomId", allowNull: false },
        targetKey: "id",
      });
      FacilitiesRoom.belongsTo(models.Facilities, {
        foreignKey: { name: "facilityId", allowNull: false },
        as: "facility",
        targetKey: "id",
      });
    }
  }
  FacilitiesRoom.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      roomId: DataTypes.UUID,
      facilityId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "FacilitiesRoom",
    }
  );
  return FacilitiesRoom;
};
