const router = require("express").Router();
const studentRoutes = require("./studentRoutes");
const mentorRoutes = require("./mentorRoutes");

router.use("/students", studentRoutes);
router.use("/mentors", mentorRoutes);

module.exports = router;
