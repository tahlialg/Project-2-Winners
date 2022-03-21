const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class LangMentor extends Model {
}

LangMentor.init(
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

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'langmentor',
  }
);

module.exports = LangMentor;