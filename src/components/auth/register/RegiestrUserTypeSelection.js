import React, { useState } from "react";
import handWave from "../../../assets/images/waving-hand.svg";

const RegiestrUserTypeSelection = ({ setFormSelection }) => {
  const [activeType, setActiveType] = useState("host");

  return (
    <div className="form-container">
      <h2 className="head">
        Welcome ! <img src={handWave} alt="hand-wave" />
      </h2>
      <p className="sub-head">Please select the user type.</p>
      <div className="selection-grid">
        {["host", "agent", "service provider"].map((type) => (
          <button
            key={type}
            className={`select ${activeType === type ? "active" : ""}`}
            onClick={() => setActiveType(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <button className="next" onClick={() => setFormSelection(activeType)}>
        Next
      </button>
    </div>
  );
};

export default RegiestrUserTypeSelection;
