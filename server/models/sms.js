'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sms = sequelize.define('Sms', {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
    },
    message: {
      type:DataTypes.TEXT,
      allowNull: false,
    },
    smsStatus: {
      type: DataTypes.ENUM,
      values: ['pending', 'delivered', 'received'],
      defaultValue: 'pending',
    },
  }, {});
  Sms.associate = function(models) {
    // associations can be defined here
    Sms.belongsTo(models.Contact, {
      foreignKey: 'contactId',
      onDelete: 'CASCADE',
    });
    
    Sms.belongsTo(models.Contact, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE',
    });
    
    Sms.belongsTo(models.Contact, {
      foreignKey: 'receiverId',
      onDelete: 'CASCADE',
    });
  };
  return Sms;
};

