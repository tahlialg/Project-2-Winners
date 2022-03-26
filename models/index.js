const Mentor = require('./mentor');
const Student = require('./student');

const Appointment = require('./appointment');
const LangMentor = require('./lang_mentor');
const LangStudent = require('./lang_student');
const Languages = require('./languages');

Languages.belongsToMany(Student, {
  through: LangStudent,
  foreignKey: 'languages_id',
});
Student.belongsToMany(Languages, {
  through: LangStudent,
  foreignKey: 'student_id',
});

Languages.belongsToMany(Mentor, {
  through: LangMentor,
  foreignKey: 'languages_id',
});
Mentor.belongsToMany(Languages, {
  through: LangMentor,
  foreignKey: 'mentor_id',
});

Mentor.hasMany(Appointment, {
  foreignKey: 'mentor_id',
});
Appointment.belongsTo(Mentor);

Student.hasMany(Appointment, {
  foreignKey: 'student_id',
});
Appointment.belongsTo(Student);

module.exports = {
  Mentor,
  Student,
  Appointment,
  LangStudent,
  LangMentor,
  Languages,
};
