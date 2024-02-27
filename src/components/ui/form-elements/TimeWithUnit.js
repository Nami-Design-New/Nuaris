import React from "react";

const TimeWithUnit = ({
  htmlFor,
  label,
  options,
  units,
  hint,
  formData,
  setFormData,
}) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {label} {hint && <span className="hint">{hint}</span>}
      </label>
      <div className="time-units">
        <select
          name={htmlFor}
          id={htmlFor}
          required
          value={formData[htmlFor]}
          onChange={(e) => {
            setFormData({ ...formData, [htmlFor]: e.target.value });
          }}
        >
          <option value="select" selected disabled>
            select
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
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

export default TimeWithUnit;
