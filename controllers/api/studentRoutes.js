const router = require("express").Router();
const { Student, LangStudent } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const studentData = await Student.create(req.body);

    req.session.save(() => {
      req.session.Student_id = studentData.id;
      req.session.logged_in = true;

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
      req.session.Student_id = studentData.id;
      req.session.logged_in = true;

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

router.get("/:id", (req, res) => {
  Student.findByPk(req.params.id, {
    include: [
      {
        model: LangStudent
      },
    ],
  }).then((student) => res.json(student));
});

router.get("/", (req, res) => {
  Student.findAll({
    include: [
      {
        model: LangStudent
      },
    ],
  }).then((student) => res.json(student));
});

module.exports = router;
