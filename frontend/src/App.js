import React from "react";
import Header from "./Components/Header/Header";
import Section from "./Components/Section/Section";
import Appointment from "./Components/Appointment/Appointment"
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <div>
            <Header />
            <Section />
          </div>
        }
      />
      <Route path="/appointment" element={<Appointment/>} />
    </Routes>
  );
};

export default App;
