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
      New.hasMany(models.ContentNew, {
        foreignKey: "newId",
        as: "contentNews",
        sourceKey: "id",
        onDelete: "CASCADE",
        hooks: true
      });
    }
  }
  New.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    thumbnailImg: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'New',
  });
  return New;
};