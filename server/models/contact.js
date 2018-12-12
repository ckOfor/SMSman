'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
    Contact.hasMany(models.Sms, {
      foreignKey: 'contactId',
      as: 'sms',
    });
  
    Contact.hasMany(models.Sms, {
      foreignKey: 'senderId',
      as: 'sender'
    });
    
    Contact.hasMany(models.Sms, {
      foreignKey: 'receiverId',
      as: 'receiver'
    });
  };
  return Contact;
};
