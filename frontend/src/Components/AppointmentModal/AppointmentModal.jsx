import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AppointmentModal.module.css";

const AppointmentModal = ({
  open,
  handleClose,
  appointment,
  handleSave,
  fetchTimeSlots,
}) => {
  const [formData, setFormData] = useState(appointment || {});
  const [selectedDoctor, setSelectedDoctor] = useState(null); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const doctors = [
    { label: "Dr. John Doe", id: 1 },
    { label: "Dr. Jane Smith", id: 2 },
  ];

  useEffect(() => {
    if (appointment) {
      setFormData(appointment);
      setSelectedDoctor(doctors.find((doc) => doc.label === appointment.doctor) || null); 
      setSelectedDate(appointment.date ? new Date(appointment.date) : null);
      setSelectedSlot(appointment.time || null);
    }
  }, [appointment]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (selectedDoctor) {
      fetchTimeSlots(selectedDoctor.id, date).then((slots) => setTimeSlots(slots));
    }
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": { maxHeight: "80vh" }, 
      }}
    >
      <DialogTitle>Edit Appointment</DialogTitle>
      <DialogContent sx={{ height: "40vh", overflowY: "auto" }}>
        <Autocomplete
          disablePortal
          options={doctors}
          getOptionLabel={(option) => option.label}
          value={selectedDoctor} 
          onChange={(event, value) => {
            setSelectedDoctor(value);
            setSelectedDate(null);
            setTimeSlots([]);
            setSelectedSlot(null);
          }}
          isOptionEqualToValue={(option, value) => option.id === value?.id}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
              borderRadius: "8px",
              "& fieldset": { borderColor: "#ccc" },
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
            },
          }}
          renderInput={(params) => <TextField {...params} label="Select Doctor" />}
        />

        <div className={styles.date}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
            placeholderText="Select Date"
            disabled={!selectedDoctor}
          />
        </div>

        {selectedDate && timeSlots.length > 0 && (
          <div className={styles.pill}>
            {timeSlots.map((slot) => (
              <button
                key={slot}
                className={`${styles.pillbutton} ${
                  selectedSlot === slot ? styles.selected : ""
                }`}
                onClick={() => handleSlotSelection(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button
          onClick={() =>
            handleSave({
              ...formData,
              doctor: selectedDoctor?.label || "",
              date: selectedDate,
              time: selectedSlot,
            })
          }
          variant="contained"
          color="primary"
          disabled={!selectedDoctor || !selectedDate || !selectedSlot}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentModal;
