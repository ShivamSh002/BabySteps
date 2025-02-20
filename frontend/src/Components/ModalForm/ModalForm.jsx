import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./ModalForm.module.css"; // Optional for styling

const ModalForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    appointmentType: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); 
  };

  return (
    <div className={styles.modal}>
      <h1>Continue Booking...</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="Patient Name"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Appointment Type"
          name="appointmentType"
          value={formData.appointmentType}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />

<Button
  type="submit"
  variant="contained"
  fullWidth
  sx={{
    backgroundColor: "white", // Ensures white background
    position: "relative",
    marginTop: "40px",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "none",
    overflow: "hidden",
    border: "1px solid #004c8c",
    "& .gradient-text": {  // Targeting a custom class
      background: "linear-gradient(to right, #004c8c, #00d6a3)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  }}
>
  <span className="gradient-text">Book Appointment</span>
</Button>

      </form>
    </div>
  );
};

export default ModalForm;
