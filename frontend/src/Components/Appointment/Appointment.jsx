import React, { useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import styles from "./Appointment.module.css";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Appointment = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, date: "2025-03-10", time: "10:00 AM", doctor: "Dr. Smith" },
    { id: 2, date: "2025-03-12", time: "02:30 PM", doctor: "Dr. Johnson" },
    { id: 3, date: "2025-03-15", time: "11:45 AM", doctor: "Dr. Lee" },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const navigate = useNavigate();


  // Open modal with selected appointment
  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedAppointment(null);
  };

  // Save edited appointment
  const handleSave = (updatedData) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === updatedData.id ? updatedData : appt))
    );
    handleClose();
  };

  // Delete an appointment
  const handleCancel = (id) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
  };

  const fetchTimeSlots = async (doctorId, date) => {
    // Replace with actual API call
    return ["10:00 AM", "11:30 AM", "2:00 PM", "4:45 PM"];
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1>Appointments</h1>
        <Button
          variant="contained"
          sx={{
            height: "50px",
            marginTop: "10px",
            background: "linear-gradient(to right, #004c8c, #00d6a3)",
            color: "white",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(to right, #003366, #00b38f)",
            },
          }}
          onClick={() => navigate("/")}
        >
          Go Back
        </Button>
      </div>

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "25%" }}><b>Date</b></TableCell>
              <TableCell sx={{ width: "25%" }}><b>Time</b></TableCell>
              <TableCell sx={{ width: "25%" }}><b>Doctor</b></TableCell>
              <TableCell sx={{ width: "25%" }}><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.id}>
                <TableCell sx={{ width: "25%" }}>{appt.date}</TableCell>
                <TableCell sx={{ width: "25%" }}>{appt.time}</TableCell>
                <TableCell sx={{ width: "25%" }}>{appt.doctor}</TableCell>
                <TableCell sx={{ width: "25%" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ marginRight: "10px" }}
                    onClick={() => handleEdit(appt)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleCancel(appt.id)}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Editing Appointment */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AppointmentModal
            open={open}
            handleClose={handleClose}
            appointment={selectedAppointment}
            handleSave={handleSave}
            fetchTimeSlots={fetchTimeSlots}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Appointment;
