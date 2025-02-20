import React from 'react'
import Button from "@mui/material/Button";

const Appointment = () => {
  return (
    <div>
        <div><p>Appointment</p>
        <Button
      variant="contained"
      sx={{
        height:"50px",
        marginTop:"10px",
        background: "linear-gradient(to right, #004c8c, #00d6a3)",
        color: "white",
        fontWeight: "bold",
        "&:hover": {
          background: "linear-gradient(to right, #003366, #00b38f)", 
        },
      }}
   
    >
      Appointments
    </Button>
        </div>
    </div>
  )
}

export default Appointment