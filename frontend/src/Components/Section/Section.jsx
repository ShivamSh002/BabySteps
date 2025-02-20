import React, { useState } from "react";
import styles from "./Section.module.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Section = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [submitBtn, setSubmitBtn] = useState(false);

  const doctors = [
    { label: "Dr. John Doe", id: 1 },
    { label: "Dr. Jane Smith", id: 2 },
  ];

  const fetchTimeSlots = async (doctorId, date) => {
    const slots = ["10:00 AM", "11:30 AM", "2:00 PM"];
    setTimeSlots(slots);
    setSelectedSlot(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>Booking An Appointment!</div>

      <div className={styles.form}>
        <Autocomplete
          disablePortal
          options={doctors}
          onChange={(event, value) => {
            setSelectedDoctor(value);
            setSelectedDate(null);
            setTimeSlots([]);
            setSelectedSlot(null);
          }}
          sx={{
            textAlign: "center",
            width: "50% !important",
            "& .MuiOutlinedInput-root": {
              width: "100% !important",
              backgroundColor: "white",
              borderRadius: "8px",
              paddingRight: "50px !important",
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
            "& .MuiAutocomplete-endAdornment": {
              width: "max-content",
            },
          }}
          slotProps={{
            paper: {
              sx: {
                width: "100% !important",
              },
            },
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select Doctor" />
          )}
        />

        <DatePicker
          className={styles.date}
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            fetchTimeSlots(selectedDoctor?.id, date);
          }}
          minDate={new Date()}
          maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          placeholderText="Select Date"
          disabled={!selectedDoctor}
        />

        {selectedDate && timeSlots.length > 0 && (
          <div className={styles.pill}>
            {timeSlots.map((slot) => (
              <button
                key={slot}
                className={`${styles.pillbutton} ${
                  selectedSlot === slot ? styles.selected : ""
                }`}
                onClick={() => {
                  setSelectedSlot(slot);
                  setSubmitBtn(true);
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            position: "relative",
            marginTop: "40px",
            fontWeight: "bold",
            fontSize: "16px",
            textTransform: "none",
            overflow: "hidden",
            border: "1px solid #004c8c",
            "& span": {
              background: submitBtn
                ? "linear-gradient(to right, #004c8c, #00d6a3)"
                : "white",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
          disabled={submitBtn ? false : true}
        >
          <span>Book Appointment</span>
        </Button>
      </div>
    </div>
  );
};

export default Section;
