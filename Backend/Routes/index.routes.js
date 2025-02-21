const Router = require('express').Router();

Router.use("/doctors", require("./Doctor.routes"));
Router.use("/appointments", require("./Appointment.routes"));

module.exports = Router;    