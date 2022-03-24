// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class StudentAppointments extends Model {}

// StudentAppointments.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     appointment_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'appointment',
//         key: 'id',
//       },
//     },
//     student_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'student',
//         key: 'id',
//       },
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'studentappointments',
//   }
// );

// module.exports = StudentAppointments;
