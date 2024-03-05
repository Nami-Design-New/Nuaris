import React from "react";

const InputWithUnit = ({ htmlFor, label, units, hint }) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {label} {hint && <span className="hint">{hint}</span>}
      </label>
      <div className="time-units">
        <input type="number" placeholder="00" name="time" id="time" />
        <select className="units" name="units" id="units">
          {units.map((unit, index) => (
            <option key={index} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputWithUnit;
