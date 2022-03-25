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

//router.get("/ga/:id", async (req, res) => {
//  try {
//    const dbGalleryData = await Gallery.findByPk(req.params.id, {
//      include: [
//        {
//          model: Painting,
//          attributes: [
//            "id",
//            "title",
//            "artist",
//            "exhibition_date",
//            "filename",
//            "description",
//          ],
//        },
//      ],
//    });
//
//    const gallery = dbGalleryData.get({ plain: true });
//    res.render("gallery", { gallery });
//  } catch (err) {
//    console.log(err);
//    res.status(500).json(err);
//  }
//});

//router.get("/", withAuth, async (req, res) => {
//  try {
//    const userData = await User.findAll({
//      attributes: { exclude: ["password"] },
//      order: [["name", "ASC"]],
//    });
//
//    const users = userData.map((project) => project.get({ plain: true }));
//
//    res.render("homepage", {
//      users,
//      logged_in: req.session.logged_in,
//    });
//  } catch (err) {
//    res.status(500).json(err);
//  }
//});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

//sign up page
router.get("/signup", (req, res) => {
  res.render("signup");
});

//about page
router.get("/about", (req, res) => {
  res.render("about");
});

//index/homepage
router.get("/index", (req, res) => {
  res.render("index");
});

router.use(withAuth);

// mentor dashboard
router.get("/dashboardmentor/:id", async (req, res) => {

  // find out the current user type
  // mentor can only view own mentor dashboard
  const userType = req.session.user_type;
  const isMentor = userType === 'mentor';
  const mentorAllowable = isMentor && req.params.id === req.session.Mentor_id;
  if(mentorAllowable){
    return res.status(301).redirect('/login');
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


  res.render("mentor-dashboard", { mentor, appointments, session: req.session });
});
//student dashboard
router.get("/studentdashboard/:id", async (req, res) => {
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

  // res.json(student);
  res.render("dashboard", { mentors: uniqueMentors, appointments, student });
});


module.exports = router;
