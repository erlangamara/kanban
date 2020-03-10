'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        function(data){
          if(!data){
            throw new Error('Email is empty')
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        function(data){
          if(!data){
            throw new Error('Password is empty')
          }
        }
      } 
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Task, {foreignKey: 'UserId'});
  };
  return User;
};