'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Facilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Facilities.hasMany(models.FacilitiesRoom, {
        foreignKey: "facilityId",
        as: "facilitiesRooms",
        sourceKey: "id",
        onDelete: "CASCADE",
        hooks: true
      });
    }
  }
  Facilities.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: DataTypes.STRING,
    icon: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Facilities',
  });
  return Facilities;
};