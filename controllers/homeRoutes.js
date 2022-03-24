const router = require("express").Router();
const { User, Languages } = require("../models");
const withAuth = require("../utils/auth");
const {
  Mentor,
  Student,
  StudentAppointments,
  Appointment,
  LangMentor,
  LangStudent,
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

//dashboard
router.get("/dasboard/student/:id", async (req, res) => {
  //find user by id
  const userData = await Student.findByPk(
    req.params.id,
    {
      include: [
        {
          model: LangStudent,
        },
        { model: LangMentor, through: Languages },
        { model: Mentor, through: LangMentor },
      ],
    }
    //get all information, appointments, languages etc find all matching mentors
  );
  // ) res.render("dasboard",{ Mentor, Student});
  //add options for whether or not student or mentor before rendering the student details
});

//index/homepage
router.get("/", (req, res) => {
  res.render("home");
});
module.exports = router;
