const Mentor = require('./mentor');
const Student = require('./student');
const StudentAppointments = require('./studentAppointments');
const Appointment = require('./appointment');
const LangMentor = require('./lang_mentor');
const LangStudent = require('./lang_student');
const Languages = require('./languages');

Languages.belongsToMany(Student, { through: LangStudent });
Student.belongsToMany(Languages, { through: LangStudent });

Languages.belongsToMany(Mentor, { through: LangMentor });
Mentor.belongsToMany(Languages, { through: LangMentor });

Mentor.hasMany(Appointment, {
  foreignKey: 'mentor_id'
});
Appointment.belongsTo(Mentor);

Student.belongsToMany(Appointment, { through: StudentAppointments });
Appointment.belongsToMany(Student, { through: StudentAppointments });




module.exports = {
  Mentor,
  Student,
  StudentAppointments,
  Appointment,
  LangStudent,
  LangMentor,
  Languages,
};

