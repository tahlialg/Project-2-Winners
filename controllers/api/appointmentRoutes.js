const router = require("express").Router();
const { Appointment } = require("../../models");

// When student requests an appointment,
// intitial state should be unaccepted
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const appointmentData = await Appointment.create({
      ...req.body,
      mentor_id: req.session.user_id,
    });
    res.status(200).json(appointmentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// request and accept appointment appointment
router.put("/:id", async (req, res) => {
  try {
    const appointmentData = await Appointment.findByPk(req.params.id);
    await appointmentData.update({ status: req.body.status });
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
