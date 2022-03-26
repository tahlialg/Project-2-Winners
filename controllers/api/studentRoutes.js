const router = require("express").Router();
const { Student, LangStudent } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const studentData = await Student.create(req.body);

    req.session.save(() => {
      req.session.user_id = studentData.id;
      req.session.logged_in = true;
      req.session.user_type = 'student';

      res.status(200).json(studentData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const studentData = await Student.findOne({
      where: { email: req.body.email },
    });

    if (!studentData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await studentData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = studentData.id;
      req.session.logged_in = true;
      req.session.user_type = 'student';

      res.json({ Student: studentData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//get student by there id (will include languages thursday)
router.get("/:id", (req, res) => {
  Student.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  }).then((student) => res.json(student));
});

//get all students
router.get("/", (req, res) => {
  Student.findAll({
    //include: [
    //  {
    //    model: LangStudent
    //  },
    //],
  }).then((students) => res.json(students));
});

//delete student user
router.delete("/:id", async (req, res) => {
  try {
    const studentData = await Student.findOne({
      where: { email: req.body.email },
    });

    if (!studentData) {
      res
        .status(400)
        .json({ message: "Incorrect email, please try again" });
      return;
    }

    const validPassword = await studentData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect password, please try again" });
      return;
    }
    studentData.destroy();
    res.json({ message: "user deleted" });
  } catch (err) {
    res.status(400).json(err,);
  }
});

module.exports = router;
