'use strict';

module.exports = (sequelize, DataTypes) => {
  const Publication = sequelize.define('Publication', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
  }, {
    sequelize,
    tableName: 'publications',
    modelName: "Publication"
  });
  Publication.associate = function (models) {
      models.Publication.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
  };
  return Publication;
};
