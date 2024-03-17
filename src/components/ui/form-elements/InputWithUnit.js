import React, { useState } from "react";

const InputWithUnit = ({
  htmlFor,
  label,
  units,
  hint,
  formData,
  setFormData
}) => {
  const [unit, setUnit] = useState(units[0]);
  const [value, setValue] = useState("");

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    handleChange(value, e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
    handleChange(e.target.value, unit);
  };

  const handleChange = (newValue, newUnit) => {
    const combined = `${newValue} ${newUnit}`;
    setFormData({ ...formData, [htmlFor]: combined });
  };

  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {label} {hint && <span className="hint">{hint}</span>}
      </label>
      <div className="time-units">
        <input
          type="number"
          placeholder="00"
          name={htmlFor}
          id={htmlFor}
          value={value}
          onChange={handleValueChange}
        />
        <select
          className="units"
          name="units"
          id="units"
          value={unit}
          onChange={handleUnitChange}
        >
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
