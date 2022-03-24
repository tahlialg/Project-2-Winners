const router = require("express").Router();
const { Appointment } = require("../../models");

// When student requests an appointment,
// intitial state should be unaccepted
router.post("/", async (req, res) => {
  try {
    const appointmentData = await Appointment.create(req.body);
    res.status(200).json(appointmentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// accept appointment
router.put("/:id", async (req, res) => {
  try {
    const appointmentData = await Appointment.findByPk(req.params.id);
    await appointmentData.update({ accepted: "true" });
    await appointmentData.save;
    res.status(200).json(appointmentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete a appointment
router.delete("/:id", async (req, res) => {
  try {
    const appointmentData = await Appointment.findByPk(req.params.id);

    await appointmentData.destroy();
    res.status(200).json(appointmentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
