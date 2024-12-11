'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class New extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  New.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    thumbnailImg: DataTypes.STRING,
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'New',
  });
  return New;
};