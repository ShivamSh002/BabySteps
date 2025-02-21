const express = require("express")
const mongoose = require("mongoose");
const server = express()

console.log("hi")
server.use("/", require("./Routes/index.routes.js"))
mongoose
  .connect("mongodb+srv://BookingSystem:BookingSystem123@appointment-booking-sys.8unk0.mongodb.net/BookingSystem")
  .then(() => {
    console.log("connected to db");
    server.listen(3001, () => {
      console.log("listening");
    });
  })
  .catch((e) => {
    console.log(e);
  });