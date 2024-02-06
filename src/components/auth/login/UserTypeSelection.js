import React, { useState } from "react";
import handWave from "../../../assets/images/waving-hand.svg";

const UserTypeSelection = ({ setShowLoginForm, setUserTypeSelected }) => {
  const [activeType, setActiveType] = useState("host");
  const handleSetType = type => {
    setActiveType(type);
    setUserTypeSelected(type);
  };

  return (
    <div className="form-container">
      <h2 className="head">
        Welcome Back ! <img src={handWave} alt="hand-wave" />
      </h2>
      <p className="sub-head">Please select the user type.</p>
      <div className="selection-grid">
        <button
          className={`select ${activeType === "host" ? "active" : ""}`}
          onClick={() => handleSetType("host")}
        >
          Host
        </button>
        <button
          className={`select ${activeType === "agent" ? "active" : ""}`}
          onClick={() => handleSetType("agent")}
        >
          Agent
        </button>
        <button
          className={`select ${activeType === "service provide"
            ? "active"
            : ""}`}
          onClick={() => handleSetType("service provide")}
        >
          Service provide
        </button>
        <button
          className={`select ${activeType === "employee" ? "active" : ""}`}
          onClick={() => handleSetType("employee")}
        >
          Employee
        </button>
      </div>
      <button className="next" onClick={() => setShowLoginForm(true)}>
        Next
      </button>
    </div>
  );
};

export default UserTypeSelection;
