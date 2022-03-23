const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Appointment extends Model {}

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
    date_time: {
      type: DataTypes.DATE,
    },
    accepted: {
      type: DataTypes.BOOLEAN,
    },
    //TODO: enable later if time allows, limit appointments to a ceretain number of students
    // max_students: {
    //   type: DataTypes.INTEGER,
    //   validate:{
    //     min:1,
    //     max:5
    //   }
    // },
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
