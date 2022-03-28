const router = require("express").Router();
const { Mentor, LangMentor } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const mentorData = await Mentor.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      description: req.body.description,
      postcode: req.body.postcode,
      password: req.body.password,
    });
    const mentorLanguages = await LangMentor.create({
      mentor_id: mentorData.id,
      languages_id: req.body.language_id,
    });

    req.session.save(() => {
      req.session.user_id = mentorData.id ;
      req.session.logged_in = true;
      req.session.user_type = "mentor";

      res.status(200).json([mentorData, mentorLanguages]);
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
    // res.json({ message: "You are now logged in!" });
    req.session.save(() => {
      req.session.user_id = mentorData.id;
      req.session.logged_in = true;
      req.session.user_type = "mentor";
      res.json({
        Mentor: mentorData,
        message: "You are now logged in!",
        id: mentorData.id,
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//get Mentor by there id (will include languages thursday)
router.get("/:id", (req, res) => {
  Mentor.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  }).then((mentor) => res.json(mentor));
});

//delete mentor
router.delete("/:id", async (req, res) => {
  try {
    const mentorData = await Mentor.findOne({
      where: { email: req.body.email },
    });

    if (!mentorData) {
      res.status(400).json({ message: "Incorrect email, please try again" });
      return;
    }

    const validPassword = await mentorData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }
    mentorData.destroy();
    res.json({ message: "user deleted" });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
