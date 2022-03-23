const router = require("express").Router();
const studentRoutes = require("./studentRoutes");
const mentorRoutes = require("./mentorRoutes");
const appointmentRoutes = require("./appointmentRoutes");

router.use("/appointments", appointmentRoutes);
router.use("/students", studentRoutes);
router.use("/mentors", mentorRoutes);

module.exports = router;
