import { useState } from "react";

export default function UserTypeSelection({
  setFormSelection,
  setShowRegisterForm,
}) {
  const [activeType, setActiveType] = useState("host");

  return (
    <div className="form">
      <h2 className="head">
        Welcome !{" "}
        <img src="/images/icons/waving-hand.svg" alt="hand-wave" />
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
      <button
        className="next"
        onClick={() => {
          setFormSelection(activeType);
          setShowRegisterForm(true);
        }}
      >
        Next
      </button>
    </div>
  );
}
