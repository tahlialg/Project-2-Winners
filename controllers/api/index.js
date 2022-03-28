const router = require("express").Router();
const studentRoutes = require("./studentRoutes");
const mentorRoutes = require("./mentorRoutes");
const appointmentRoutes = require("./appointmentRoutes");

router.use("/appointments", appointmentRoutes);
router.use("/students", studentRoutes);
router.use("/mentors", mentorRoutes);
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;
