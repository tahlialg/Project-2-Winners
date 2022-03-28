const router = require("express").Router();
const withAuth = require("../utils/auth");
const {
  Mentor,
  Student,
  Appointment,
  LangMentor,
  LangStudent,
  Languages,
} = require("../models");

router.get("/login", (req, res) => {
  if (req.session.logged_in && req.session.userType === 'mentor') {
    res.redirect("/mentee-dashboard/" + req.session.mentor_id);
    return;
  }
  if (req.session.logged_in && req.session.userType === 'student') {
    res.redirect("/mentor-dashboard/" + req.session.student_id);
    return;
  }

  res.render("/login");
});
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/index");
    return;
  }
  res.render("signup");
});
//sign up page mentee

// router.get("/signup-mentee", (req, res) => {
//   res.render("signupMentee");
// });
// router.get("/signup-mentee", (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect("/home");
//     return;
//   }
//   res.render("signupMentee");
// });
// router.get("/signup-mentor", (req, res) => {
//   res.render("signup-mentor");
// });
// router.get("/signup-mentee", (req, res) => {
//   res.render("signup-mentor");
// });
// router.get("/login-mentor", (req, res) => {
//   res.render("login-mentor");
// });
// router.get("/login-mentee", (req, res) => {
//   res.render("login-mentee");
// });
// //about page
// router.get("/about", (req, res) => {
//   res.render("about");
// });

router.get("/signup-mentee", (req, res) => {
  res.render("signup-mentee");
});

router.get("/signup-mentor", (req, res) => {
  res.render("signup-mentor");
});
router.get("/login-mentor", (req, res) => {
  res.render("login-mentors");
});
router.get("/login-mentee", (req, res) => {
  res.render("login-mentee");
});
//about page
router.get("/about", (req, res) => {
  res.render("about");
});

//index/homepage
// router.get("/index", (req, res) => {
//   res.render("index");
// });

router.get('/', async (req, res) => {
  try {
    res.render('index');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.use(withAuth);

// mentor dashboard
router.get("/dashboardmentor/:id", async (req, res) => {

  // find out the current user type
  // mentor can only view own mentor dashboard
  const userType = req.session.user_type;
  const isMentor = userType === 'mentor';
  const mentorAllowable = isMentor && req.params.id === req.session.user_id;
  if(mentorAllowable){
    return res.status(301).redirect('/login-mentee');
  }

  const mentor = await Mentor.findByPk(req.params.id, {
    include: [
      {
        // attributes: { exclude: ["langmentor"] },
        model: Languages,
        through: { attributes: [], model: LangMentor },
        include: [{ model: Student, through: { attributes: [], model: LangStudent } }],
      },
    ],
  });

  // const students = student.languages.map((l) => l.mentors).flat();
  // const uniqueIds = [];

  // const uniqueMentors = mentors.filter((element) => {
  //   const isDuplicate = uniqueIds.includes(element.id);

  //   if (!isDuplicate) {
  //     uniqueIds.push(element.id);

  //     return true;
  //   }
  // });

  const appointments = await Appointment.findAll({
    where: {
      mentor_id: req.params.id,
    },
  });

  // res.json(student);

  // 1. get mentor's lang preference
  // const mentorLangs = await LangMentor.findAll({
  //   where: {
  //     mentor_id: mentor.id
  //   }
  // });

  // console.log(mentorLangs);

  // const langIdsWanted = mentorLangs.map((lang) => lang.languages_id);

  //  [3,4,7]

  // 2. query all the students based on mentor's lang preference

  // 3. load the students into res.render

  //possibleStudents
  res.render("mentor-dashboard", { mentor, appointments, session: req.session, });
});

//student dashboard
router.get("/dashboardstudent/:id", async (req, res) => {
  const student = await Student.findByPk(req.params.id, {
    include: [
      {
        // attributes: { exclude: ["langmentor"] },
        model: Languages,
        through: { attributes: [], LangStudent },
        include: [{ model: Mentor, through: { attributes: [], LangMentor } }],
      },
    ],
  });

  const mentors = student.languages.map((l) => l.mentors).flat();
  const uniqueIds = [];

  const uniqueMentors = mentors.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id);

    if (!isDuplicate) {
      uniqueIds.push(element.id);

      return true;
    }
  });

  const appointments = await Appointment.findAll({
    where: {
      student_id: req.params.id,
    },
  });
  res.render("mentee-dashboard", { mentors: uniqueMentors, appointments, student, session: req.session });
});


module.exports = router;
