const Appointment = require("../Models/Appointment.model");
const Doctor = require("../Models/Doctor.model");


const getAllDocotrs = async (req, res) => {
    console.log("hi doctor")
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllSlot = async (req, res) => {
    console.log("hi", req.query);
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: "Date query parameter is required" });
    }

    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const appointments = await Appointment.find({ doctor: id, date });
        const bookedSlots = appointments.map((appointment) => appointment.timeSlot);

        const { start, end } = doctor.workingHours;
        const availableSlots = generateTimeSlots(start, end, bookedSlots);

        res.status(200).json({ availableSlots });
    } catch (error) {
        console.log("hi error", error);
        res.status(500).json({ message: error.message });
    }
};

const generateTimeSlots = (start, end, bookedSlots) => {
    const slots = [];
    let currentTime = start;

    while (currentTime < end) {
        if (!bookedSlots.includes(currentTime)) {
            slots.push(currentTime);
        }

        currentTime = addMinutesToTime(currentTime, 30);
    }

    return slots;
};

const addMinutesToTime = (time, minutes) => {
    let [hours, mins] = time.split(":").map(Number);
    mins += minutes;

    if (mins >= 60) {
        hours += Math.floor(mins / 60);
        mins = mins % 60;
    }

    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};


module.exports = {
    getAllDocotrs,
    getAllSlot
};