const sequelize = require('../config/connection');

class LangStudent extends Model {
}

LangStudent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'student',
        key: 'id',
      },
    },
    language_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'laguage',
        key: 'id',
      },
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'langstudent',
  }
);

module.exports = LangStudent;