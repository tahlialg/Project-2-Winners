const router = require("express").Router();
const { Mentor } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const mentorData = await Mentor.create(req.body);

    req.session.save(() => {
      req.session.user_id = mentorData.id;
      req.session.logged_in = true;
      req.session.user_type = 'mentor';

      res.status(200).json(mentorData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const mentorData = await Mentor.findOne({
      where: { email: req.body.email },
    });

    if (!mentorData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await mentorData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = mentorData.id;
      req.session.logged_in = true;
      req.session.user_type = 'mentor';
      res.json({ Mentor: mentorData, message: "You are now logged in!" });
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

//get Mentor by there id (will include languages thursday)
router.get("/:id", (req, res) => {
  Mentor.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  }).then((mentor) => res.json(mentor));
});

//get all mentors
router.get("/", (req, res) => {
  Mentor.findAll({
    //include: [
    //  {
    //    model: LangMentor
    //  },
    //],
  }).then((mentors) => res.json(mentors));
});

//delete mentor
router.delete("/:id", async (req, res) => {
  try {
    const mentorData = await Mentor.findOne({
      where: { email: req.body.email },
    });

    if (!mentorData) {
      res
        .status(400)
        .json({ message: "Incorrect email, please try again" });
      return;
    }

    const validPassword = await mentorData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect password, please try again" });
      return;
    }
    mentorData.destroy();
    res.json({ message: "user deleted" });
  } catch (err) {
    res.status(400).json(err,);
  }
});

module.exports = router;
