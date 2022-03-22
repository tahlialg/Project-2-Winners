const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Appointment extends Model {
}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    mentor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'mentor',
          key: 'id',
        },
    },
    date_time:{
      type: DataTypes.DATE,
    },

    max_students:{
      type: DataTypes.INTEGER,
    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'appointment',
  }
);

module.exports = Appointment;