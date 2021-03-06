'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.User, {foreignKey: 'UserId'});
  };
  return Task;
};