import React from "react";

function CheckboxInputAsRadio({ option, hint, name, checked, onChange }) {
  return (
    <div className="checkbox-row checkbox-radio-row col-3">
      <input
        id={option}
        name={name}
        type="checkbox"
        value={option}
        onChange={onChange}
        className="checkbox-input"
        checked={checked}
      />
      <label htmlFor={option}>
        {option} {hint && <span className="hint">{hint}</span>}
      </label>
    </div>
  );
}

export default CheckboxInputAsRadio;
