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
        {["host", "agent", "service provider", "employee"].map(type => (
          <button
            key={type}
            className={`select ${activeType === type ? "active" : ""}`}
            onClick={() => handleSetType(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <button className="next" onClick={() => setShowLoginForm(true)}>
        Next
      </button>
    </div>
  );
};

export default UserTypeSelection;
