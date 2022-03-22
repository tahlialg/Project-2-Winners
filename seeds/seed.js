const sequelize = require("../config/connection");
const {
  Student,
  Mentor,
  Languages,
  LangMentor,
  LangStudent,
} = require("../models");

const studentData = require("./studentData.json");
const mentorData = require("./mentorData.json");

const languageData = require("./languageData.json");

const lang_mentorData = require("./lang_mentorData.json");
const lang_studentData = require("./lang_studentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Student.bulkCreate(studentData, {
    individualHooks: true,
    returning: true,
  });

  await Mentor.bulkCreate(mentorData, {
    individualHooks: true,
    returning: true,
  });

  await Languages.bulkCreate(languageData, {
    individualHooks: true,
    returning: true,
  });

  await LangMentor.bulkCreate(lang_mentorData, {
    individualHooks: true,
    returning: true,
  });

  await LangStudent.bulkCreate(lang_studentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
