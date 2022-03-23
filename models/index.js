const Mentor = require('./mentor');
const Student = require('./student');
const StudentAppointments = require('./studentAppointments');
const Appointment = require('./appointment');
const LangMentor = require('./lang_mentor');
const LangStudent = require('./lang_student');
const Languages = require('./languages');

Languages.belongsToMany(Student, { through: LangStudent, foreignKey: "languages_id", });
Student.belongsToMany(Languages, { through: LangStudent, foreignKey: "student_id", });

Languages.belongsToMany(Mentor, { through: LangMentor, foreignKey: "languages_id", });
Mentor.belongsToMany(Languages, { through: LangMentor, foreignKey: "mentor_id", });

Mentor.hasMany(Appointment, {
  foreignKey: 'mentor_id'
});
Appointment.belongsTo(Mentor);

Student.belongsToMany(Appointment, { through: StudentAppointments, foreignKey: "student_id", });
Appointment.belongsToMany(Student, { through: StudentAppointments, foreignKey: "appointment_id", });


module.exports = {
  Mentor,
  Student,
  StudentAppointments,
  Appointment,
  LangStudent,
  LangMentor,
  Languages,
};

