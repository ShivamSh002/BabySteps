import React from "react";
import styles from "./Header.module.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <p> BabySteps</p>
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
      onClick={() => navigate("/appointment")} 
    >
      My Appointments
    </Button>
    </div>
  );
};

export default Header;
